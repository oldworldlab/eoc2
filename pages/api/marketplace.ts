import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase, dummyData } from '../../lib/database';
import { MarketplaceListing } from '../../entity/MarketplaceListing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await initializeDatabase(); // This is just to maintain the structure

      // Instead of fetching from a database, we'll return our dummy data
      res.status(200).json({ listings: dummyData.listings || [] });
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { sellerId, itemName, quantity, price } = req.body;

      // Create a new listing
      const newListing: MarketplaceListing = {
        id: dummyData.listings.length + 1,
        sellerId,
        itemName,
        quantity,
        price,
        listed: new Date()
      };

      // Add the new listing to the dummy data
      dummyData.listings.push(newListing);

      res.status(201).json({ message: 'Listing created successfully', listing: newListing });
    } catch (error) {
      console.error('Error creating marketplace listing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}