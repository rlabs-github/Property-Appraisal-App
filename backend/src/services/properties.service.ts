// backend/src/services/properties.service.ts
import { db } from '@config/database';
import { Property } from '../types';

console.log('DB Object:', db);
console.log('DB Query Method:', db.query);

export class PropertiesService {
  async getAll(): Promise<Property[]> {
    const query = 'SELECT * FROM properties';
    const result = await db.query(query);
    return result.rows;
  }

  async getById(id: string): Promise<Property | null> {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data: Omit<Property, 'id'>): Promise<Property> {
    if (!data.name || !data.tenant_id || !data.address) {
      throw new Error('Missing required property fields: name, address, or tenant_id');
    }    
    const query = `
      INSERT INTO properties (name, address, tenant_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *
    `;
    const result = await db.query(query, [
      data.name,
      data.address,
      data.tenant_id
    ]);
    return result.rows[0];
  }

  async update(id: string, data: Partial<Property>): Promise<Property | null> {
    const query = `
      UPDATE properties
      SET name = $1, address = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;
    const result = await db.query(query, [data.name, data.address, id]);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM properties WHERE id = $1';
    await db.query(query, [id]);
  }
}
