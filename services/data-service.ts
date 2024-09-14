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
    resourceName: 'Cloth',
    gatheringMethod: 'Harvesting',
    locations: ['Fields of Serenity', 'Meadows of Dawn'],
  },
  {
    resourceName: 'Leather',
    gatheringMethod: 'Skinning',
    locations: ['Forest of Beasts', 'Savannah Plains'],
  },
  {
    resourceName: 'Iron Ore',
    gatheringMethod: 'Mining',
    locations: ['Iron Hills', 'Caverns of Might'],
  },
  // Add more resources here...
];