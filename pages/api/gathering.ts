import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase, dummyData } from '../../lib/database';

interface User {
  id: number;
  username: string;
  inventory: { [key: string]: number };
}

interface GatheringResource {
  id: number;
  resourceName: string;
  gatheringMethod: string;
  locations: string[];
  tier: number;
  baseGatherRate: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await initializeDatabase(); // This is just to maintain the structure, it doesn't do much now

      // Instead of fetching from a database, we'll return our dummy data
      res.status(200).json({ resources: dummyData.gatheringResources || [] });
    } catch (error) {
      console.error('Error fetching gathering data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, resourceId } = req.body;
      
      // Find the user in our dummy data
      const user = dummyData.users.find(u => u.id === userId) as User | undefined;
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Find the resource in our dummy data
      const resource = dummyData.gatheringResources?.find(r => r.id === resourceId) as GatheringResource | undefined;
      
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      // Update user's inventory
      if (!user.inventory) user.inventory = {};
      user.inventory[resource.resourceName] = (user.inventory[resource.resourceName] || 0) + 1;

      res.status(200).json({ message: 'Resource gathered successfully', inventory: user.inventory });
    } catch (error) {
      console.error('Error in gathering resource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}