import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase, dummyData } from '../../lib/database';

interface User {
  id: number;
  username: string;
  inventory: { [key: string]: number };
}

interface Recipe {
  id: number;
  itemName: string;
  componentsRequired: { componentName: string; quantity: number }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await initializeDatabase(); // This is just to maintain the structure, it doesn't do much now

      // Instead of fetching from a database, we'll return our dummy data
      res.status(200).json({
        recipes: dummyData.recipes || [],
        components: dummyData.components || [],
        relics: dummyData.relics || [],
      });
    } catch (error) {
      console.error('Error fetching crafting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, recipeId } = req.body;
      
      // Find the user in our dummy data
      const user = dummyData.users.find(u => u.id === userId) as User | undefined;
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Find the recipe in our dummy data
      const recipe = dummyData.recipes?.find(r => r.id === recipeId) as Recipe | undefined;
      
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      // Check if user has required components (this is a simplified check)
      const canCraft = true; // In a real scenario, you'd check the user's inventory

      if (!canCraft) {
        return res.status(400).json({ message: 'Not enough resources' });
      }

      // Simulate crafting
      if (!user.inventory) user.inventory = {};
      user.inventory[recipe.itemName] = (user.inventory[recipe.itemName] || 0) + 1;

      res.status(200).json({ message: 'Item crafted successfully', inventory: user.inventory });
    } catch (error) {
      console.error('Error in crafting item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}