// frontend/tests/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/properties', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        properties: [
          {
            id: '1',
            name: 'Test Property',
            address: '123 Test St',
            status: 'active'
          }
        ]
      })
    );
  }),
  
  rest.post('/api/appraisals', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'new-appraisal-id',
        status: 'draft'
      })
    );
  })
];