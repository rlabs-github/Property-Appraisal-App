// services/forms/builder.service.ts
import db from '@config/database';

export class FormBuilderService {
    async createForm(formData: any) {
        console.log(`Creating form: ${formData.name}`);
        const result = await db.query(
            'INSERT INTO forms (name, description, fields) VALUES ($1, $2, $3) RETURNING *',
            [formData.name, formData.description, JSON.stringify(formData.fields)]
        );
        return result.rows[0];
    }

    async updateForm(id: string, data: Partial<any>) {
        console.log(`Updating form ${id}`);
        const result = await db.query(
            'UPDATE forms SET name = $1, description = $2, fields = $3 WHERE id = $4 RETURNING *',
            [data.name, data.description, JSON.stringify(data.fields), id]
        );
        return result.rows[0];
    }

    async listForms() {
        const result = await db.query('SELECT * FROM forms');
        return result.rows;
    }     
}
