// src/pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // TODO: Implement actual user authentication
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'admin'
    };

    res.status(200).json(mockUser);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}