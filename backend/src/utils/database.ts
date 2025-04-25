import { Pool, QueryResult, PoolClient, QueryResultRow } from 'pg';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

// Define missing types
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResult<T> {
  rows: T[];
  total: number;
  pages: number;
}

export interface TransactionOptions {
  isolationLevel?: 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';
  timeout?: number;
}

export class DatabaseError extends AppError {
  constructor(message: string, public query?: string, public params?: any[]) {
    super(500, message);
    this.name = 'DatabaseError';
  }
}

export class DatabaseUtils {
  private readonly RETRY_ATTEMPTS = 3;
  private readonly VALID_IDENTIFIERS = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  private readonly DEFAULT_TIMEOUT = 5000; // 5 seconds
  
  constructor(private pool: Pool) {}

  /**
   * Validates and ensures safety of database identifiers
   */
  private validateIdentifier(identifier: string, type: 'table' | 'column'): string {
    if (!this.VALID_IDENTIFIERS.test(identifier)) {
      throw new DatabaseError(
        `Invalid ${type} name: ${identifier}. Must start with a letter and contain only alphanumeric characters and underscores.`
      );
    }
    return identifier;
  }

  /**
   * Executes a query with retry logic for transient failures
   */
  private async executeWithRetry<T>(
    operation: (client: PoolClient) => Promise<T>,
    retryCount = this.RETRY_ATTEMPTS
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      const client = await this.pool.connect();
      try {
        return await operation(client);
      } catch (error) {
        lastError = error as Error;
        if (this.isTransientError(error)) {
          logger.warn(`Retrying query attempt ${attempt}/${retryCount}`, { error });
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
          continue;
        }
        throw error;
      } finally {
        client.release();
      }
    }
    
    throw lastError;
  }

  /**
   * Checks if an error is transient and should be retried
   */
  private isTransientError(error: unknown): boolean {
    const transientErrors = [
      'deadlock detected',
      'connection terminated',
      'too many clients',
      'connection reset by peer',
      'the database system is starting up',
      'statement timeout'
    ];
    if (error instanceof Error) {
      return transientErrors.some(msg => 
        error.message?.toLowerCase().includes(msg)
      );
    }
    return false;
  }

  /**
   * Executes a query with a timeout
   */
  private async executeWithTimeout<T extends QueryResultRow>(
    client: PoolClient,
    query: string,
    params?: any[],
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<QueryResult<T>> {
    await client.query(`SET statement_timeout = ${timeout}`);
    try {
      return await client.query<T>(query, params);
    } finally {
      await client.query('SET statement_timeout = 0');
    }
  }

  /**
   * Executes a database query with proper error handling
   */
  async executeTransaction<T extends QueryResultRow>(
    queries: { query: string; params?: any[] }[],
    options: TransactionOptions = {}
  ): Promise<T[][]> {
    const { 
      isolationLevel = 'READ COMMITTED',
      timeout = this.DEFAULT_TIMEOUT 
    } = options;
  
    return this.executeWithRetry(async (client) => {
      try {
        await client.query(`BEGIN TRANSACTION ISOLATION LEVEL ${isolationLevel}`);
        await client.query(`SET statement_timeout = ${timeout}`);
        
        const results = [];
        for (const { query, params } of queries) {
          const result = await client.query<T>(query, params);
          results.push(result.rows);
        }
        
        await client.query('COMMIT');
        return results;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        await client.query('SET statement_timeout = 0');
      }
    });
  }

  /**
   * Executes a query and returns a single row
   */
  async executeQueryOne<T extends Record<string, any>>(
    query: string,
    params?: any[],
    timeout?: number
  ): Promise<T | null> {
    const rows = await this.executeQuery<T>(query, params, timeout);
    return rows[0] || null;
  }

 /**
 * Executes a database query with proper error handling
 */
async executeQuery<T extends QueryResultRow>(
  query: string,
  params?: any[],
  timeout?: number
): Promise<T[]> {
  return this.executeWithRetry(async (client) => {
    const result = await this.executeWithTimeout<T>(client, query, params, timeout);
    return result.rows;
  });
} 

  /**
   * Executes a query with metadata
   */
  async executeQueryWithMetadata<T extends Record<string, any>>(
    query: string,
    params?: any[],
    timeout?: number
  ): Promise<{ rows: T[]; rowCount: number }> {
    return this.executeWithRetry(async (client) => {
      const result = await this.executeWithTimeout<T>(client, query, params, timeout);
      return {
        rows: result.rows,
        rowCount: result.rowCount || 0
      };
    });
  }

  /**
   * Executes an insert operation with proper validation
   */
  async executeInsert<T extends Record<string, any>>(
    tableName: string,
    data: Record<string, any>,
    timeout?: number
  ): Promise<T> {
    this.validateIdentifier(tableName, 'table');
    
    const keys = Object.keys(data).map(k => this.validateIdentifier(k, 'column'));
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);

    const query = `
      INSERT INTO ${tableName}
      (${keys.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *
    `;

    const result = await this.executeQuery<T>(query, values, timeout);
    if (!result.length) {
      throw new DatabaseError('Insert failed: No row returned');
    }
    
    return result[0];
  }

  /**
   * Executes a bulk insert operation
   */
  async executeBulkInsert<T extends Record<string, any>>(
    tableName: string,
    records: Record<string, any>[],
    timeout?: number
  ): Promise<T[]> {
    if (!records.length) {
      return [];
    }

    this.validateIdentifier(tableName, 'table');
    
    const keys = Object.keys(records[0]).map(k => this.validateIdentifier(k, 'column'));
    const values = records.map(record => Object.values(record));
    
    let paramIndex = 1;
    const valuePlaceholders = records.map(record => 
      `(${keys.map(() => `$${paramIndex++}`).join(', ')})`
    );

    const query = `
      INSERT INTO ${tableName}
      (${keys.join(', ')})
      VALUES ${valuePlaceholders.join(', ')}
      RETURNING *
    `;

    return await this.executeQuery<T>(
      query, 
      values.flat(),
      timeout
    );
  }

  /**
   * Executes an update operation with proper validation
   */
  async executeUpdate<T extends Record<string, any>>(
    tableName: string,
    data: Record<string, any>,
    whereClause: string,
    whereParams: any[] = [],
    timeout?: number
  ): Promise<T | null> {
    this.validateIdentifier(tableName, 'table');
    
    const keys = Object.keys(data).map(k => this.validateIdentifier(k, 'column'));
    const values = Object.values(data);
    const setClauses = keys.map((key, i) => `${key} = $${i + 1}`);

    const query = `
      UPDATE ${tableName}
      SET ${setClauses.join(', ')}
      WHERE ${whereClause}
      RETURNING *
    `;

    const result = await this.executeQuery<T>(
      query,
      [...values, ...whereParams],
      timeout
    );
    return result[0] || null;
  }

  /**
   * Executes a delete operation
   */
  async executeDelete(
    tableName: string,
    whereClause: string,
    whereParams: any[] = [],
    timeout?: number
  ): Promise<boolean> {
    this.validateIdentifier(tableName, 'table');

    const query = `
      DELETE FROM ${tableName}
      WHERE ${whereClause}
      RETURNING id
    `;

    const result = await this.executeQueryWithMetadata(
      query,
      whereParams,
      timeout
    );
    return result.rowCount > 0;
  }

  /**
   * Builds and executes a paginated query with proper validation
   */
  async executePaginatedQuery<T extends Record<string, any>>(
    baseQuery: string,
    options: QueryOptions,
    allowedSortFields: string[],
    timeout?: number
  ): Promise<PaginatedResult<T>> {
    // Validate sort field if provided
    if (options.sortBy && !allowedSortFields.includes(options.sortBy)) {
      throw new DatabaseError(`Invalid sort field: ${options.sortBy}`);
    }

    const { query, params } = this.buildPaginatedQuery(baseQuery, options, allowedSortFields);
    const countQuery = `SELECT COUNT(*) as total FROM (${baseQuery}) as subquery`;

    return this.executeWithRetry(async (client) => {
      const [countResult, rows] = await Promise.all([
        this.executeWithTimeout<QueryResultRow>(client, countQuery, [], timeout),
        this.executeWithTimeout<T>(client, query, params, timeout)
      ]);

      const total = parseInt(countResult.rows[0].total);
      const limit = options.limit || 10;
      
      return {
        rows: rows.rows,
        total,
        pages: Math.ceil(total / limit)
      };
    });
  }

  /**
   * Builds a paginated query with proper parameter handling
   */
  private buildPaginatedQuery(
    baseQuery: string,
    options: QueryOptions,
    allowedSortFields: string[]
  ): { query: string; params: any[] } {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'asc',
      filters = {}
    } = options;

    const params: any[] = [];
    let query = baseQuery;
    let paramIndex = 1;

    // Handle filters
    if (Object.keys(filters).length > 0) {
      const filterClauses = Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
          params.push(value);
          return `${this.validateIdentifier(key, 'column')} = $${paramIndex++}`;
        });

      if (filterClauses.length > 0) {
        query += ` WHERE ${filterClauses.join(' AND ')}`;
      }
    }

    // Handle sorting
    if (sortBy && allowedSortFields.includes(sortBy)) {
      query += ` ORDER BY ${this.validateIdentifier(sortBy, 'column')} ${
        sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
      }`;
    }

    // Add pagination
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, (page - 1) * limit);

    return { query, params };
  }

  /**
   * Creates a new database client with a specific timeout
   */
  async getClient(timeout: number = this.DEFAULT_TIMEOUT): Promise<PoolClient> {
    const client = await this.pool.connect();
    await client.query(`SET statement_timeout = ${timeout}`);
    return client;
  }

  /**
   * Releases a database client
   */
  async releaseClient(client: PoolClient): Promise<void> {
    await client.query('SET statement_timeout = 0');
    client.release();
  }
}