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

    async listTemplates() {
        console.log(`Fetching all templates`);
        const result = await db.query('SELECT * FROM templates');
        return result.rows;
    }

    async getTemplate(id: string) {
        console.log(`Fetching template with ID: ${id}`);
        const result = await db.query('SELECT * FROM templates WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            throw new Error(`Template with ID ${id} not found`);
        }

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

    async deleteTemplate(id: string) {
        console.log(`Deleting template with ID: ${id}`);
        await db.query('DELETE FROM templates WHERE id = $1', [id]);
        return { message: `Template with ID ${id} deleted successfully` };
    }
}

