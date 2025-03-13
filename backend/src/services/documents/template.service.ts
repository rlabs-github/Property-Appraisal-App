// services/documents/template.service.ts
import db from '../../config/database';

export class TemplateService {
    async createTemplate(template: any) {
        console.log(`Creating template: ${template.name}`);
        const result = await db.query(
            'INSERT INTO templates (name, content) VALUES ($1, $2) RETURNING *',
            [template.name, template.content]
        );
        return result.rows[0];
    }

    async updateTemplate(id: string, data: Partial<any>) {
        console.log(`Updating template ${id}`);
        const result = await db.query(
            'UPDATE templates SET name = $1, content = $2 WHERE id = $3 RETURNING *',
            [data.name, data.content, id]
        );
        return result.rows[0];
    }
}
