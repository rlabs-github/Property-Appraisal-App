// types/common.ts
import { QueryResultRow } from 'pg';

// Database related types
export interface QueryOptions {
  text: string;
  values?: any[];
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
  max?: number;
}

// Base model for database entities
export interface BaseModel extends QueryResultRow {
  id: string;
  created_at: Date;
  updated_at: Date;
  tenant_id?: string;
}