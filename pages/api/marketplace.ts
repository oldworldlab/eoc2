import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/database';
import { MarketplaceListing } from '../../entity/MarketplaceListing';
import { User } from '../../entity/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dataSource = await initializeDatabase();
      const listingRepository = dataSource.getRepository(MarketplaceListing);
      const listings = await listingRepository.find({ relations: ['seller'] });
      res.status(200).json({ listings });
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, itemName, quantity, price } = req.body;
      const dataSource = await initializeDatabase();
      
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if ((user.inventory[itemName] || 0) < quantity) {
        return res.status(400).json({ message: 'Not enough items to list' });
      }

      const listingRepository = dataSource.getRepository(MarketplaceListing);
      const newListing = listingRepository.create({
        seller: user,
        itemName,
        quantity,
        price,
        listed: new Date()
      });
      await listingRepository.save(newListing);

      user.inventory[itemName] -= quantity;
      await userRepository.save(user);

      res.status(200).json({ message: 'Item listed successfully', listing: newListing });
    } catch (error) {
      console.error('Error in listing item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}