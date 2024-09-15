import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/database';
import { GatheringResource } from '../../entity/GatheringResource';
import { User } from '../../entity/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dataSource = await initializeDatabase();
      const resourceRepository = dataSource.getRepository(GatheringResource);
      const resources = await resourceRepository.find();
      res.status(200).json({ resources });
    } catch (error) {
      console.error('Error fetching gathering data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, resourceId } = req.body;
      const dataSource = await initializeDatabase();
      
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const resourceRepository = dataSource.getRepository(GatheringResource);
      const resource = await resourceRepository.findOne({ where: { id: resourceId } });
      
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      // Update user's inventory
      user.inventory[resource.resourceName] = (user.inventory[resource.resourceName] || 0) + 1;
      await userRepository.save(user);

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