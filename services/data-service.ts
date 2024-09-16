import { craftingRecipes } from '../data/crafting-recipes';
import { components } from '../data/components';
import { GatheringResource } from '../types/gathering-types';

export const DataService = {
  getCraftingRecipes() {
    return craftingRecipes;
  },
  getCraftingRecipeByName(itemName: string) {
    return craftingRecipes.find((recipe) => recipe.itemName === itemName);
  },
  getComponents() {
    return components;
  },
  getComponentByName(componentName: string) {
    return components.find((component) => component.name === componentName);
  },
  getGatheringResources() {
    return gatheringResources;
  },
  getGatheringResourceByName(resourceName: string) {
    return gatheringResources.find((resource) => resource.resourceName === resourceName);
  },
};

const gatheringResources: GatheringResource[] = [
  {
    resourceName: 'Iron Ore',
    gatheringMethod: 'Mining',
    locations: ['Iron Hills', 'Caverns of Might'],
    tier: 1,
    baseGatherRate: 10,
  },
  {
    resourceName: 'Oak Wood',
    gatheringMethod: 'Woodcutting',
    locations: ['Ancient Forest', 'Dark Woods'],
    tier: 1,
    baseGatherRate: 8,
  },
  // Add more resources as needed
];