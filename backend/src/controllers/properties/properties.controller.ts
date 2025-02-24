// backend/src/controllers/properties.controller.ts
import { Request, Response } from 'express';
import { PropertiesService } from '../../services/properties.service';

export class PropertiesController {
  private service = new PropertiesService();

  async getAll(req: Request, res: Response) {
    try {
      const properties = await this.service.getAll();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const property = await this.service.getById(req.params.id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const property = await this.service.create(req.body);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create property' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const property = await this.service.update(req.params.id, req.body);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update property' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete property' });
    }
  }
}
