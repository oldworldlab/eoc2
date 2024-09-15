import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/database';
import { CraftingRecipe } from '../../entity/CraftingRecipe';
import { Component } from '../../entity/Component';
import { Relic } from '../../entity/Relic';
import { User } from '../../entity/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dataSource = await initializeDatabase();
      const recipeRepository = dataSource.getRepository(CraftingRecipe);
      const componentRepository = dataSource.getRepository(Component);
      const relicRepository = dataSource.getRepository(Relic);

      const recipes = await recipeRepository.find();
      const components = await componentRepository.find();
      const relics = await relicRepository.find();

      res.status(200).json({ recipes, components, relics });
    } catch (error) {
      console.error('Error fetching crafting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, recipeId } = req.body;
      const dataSource = await initializeDatabase();
      
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const recipeRepository = dataSource.getRepository(CraftingRecipe);
      const recipe = await recipeRepository.findOne({ where: { id: recipeId } });
      
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      // Check if user has required components
      for (const component of recipe.componentsRequired) {
        if ((user.inventory[component.componentName] || 0) < component.quantity) {
          return res.status(400).json({ message: `Not enough ${component.componentName}` });
        }
      }

      // Craft item
      for (const component of recipe.componentsRequired) {
        user.inventory[component.componentName] -= component.quantity;
      }
      user.inventory[recipe.itemName] = (user.inventory[recipe.itemName] || 0) + 1;
      await userRepository.save(user);

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