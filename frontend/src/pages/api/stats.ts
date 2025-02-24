// src/pages/api/stats.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const mockStats = {
      activeAppraisals: 5,
      pendingReviews: 3,
      completedReports: 12,
      activeTemplates: 8,
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json(mockStats);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}