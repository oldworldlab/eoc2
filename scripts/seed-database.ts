import "reflect-metadata";
import { initializeDatabase } from "../lib/database";
import { GatheringResource } from "../entity/GatheringResource";
import { CraftingRecipe } from "../entity/CraftingRecipe";
import { Component } from "../entity/Component";
import { Relic } from "../entity/Relic";
import { User } from "../entity/User";
import { MarketplaceListing } from "../entity/MarketplaceListing";
import { ItemTier } from "../constants/item-tiers";
import { GatheringMethod } from "../types/gathering-methods";
import { ItemType, ArmorType, WeaponType } from "../types/item-types";

async function seedDatabase() {
  const connection = await initializeDatabase();

  // Seed GatheringResources
  const gatheringResourceRepository = connection.getRepository(GatheringResource);
  const gatheringResources = [
    {
      resourceName: "Iron Ore",
      gatheringMethod: GatheringMethod.Mining,
      locations: ["Mountain Cave", "Old Mine"],
      tier: ItemTier.Tier1,
      baseGatherRate: 10,
    },
    {
      resourceName: "Oak Wood",
      gatheringMethod: GatheringMethod.Woodcutting,
      locations: ["Ancient Forest", "Dark Woods"],
      tier: ItemTier.Tier1,
      baseGatherRate: 8,
    },
    // Add more resources as needed
  ];
  await gatheringResourceRepository.save(gatheringResources);

  // Seed Components
  const componentRepository = connection.getRepository(Component);
  const components = [
    {
      name: "Cloth",
      tier: ItemTier.Tier1,
      gatheredFrom: "Harvesting",
      baseValue: 5,
    },
    {
      name: "Leather",
      tier: ItemTier.Tier1,
      gatheredFrom: "Skinning",
      baseValue: 7,
    },
    // Add more components as needed
  ];
  await componentRepository.save(components);

  // Seed Relics
  const relicRepository = connection.getRepository(Relic);
  const relics = [
    {
      name: "Ancient Starmap",
      tier: ItemTier.Tier3,
      description: "A map of the stars from an ancient civilization.",
      baseValue: 100,
    },
    {
      name: "Phoenix Feather",
      tier: ItemTier.Tier4,
      description: "A feather from a legendary phoenix.",
      baseValue: 200,
    },
    // Add more relics as needed
  ];
  await relicRepository.save(relics);

  // Seed CraftingRecipes
  const craftingRecipeRepository = connection.getRepository(CraftingRecipe);
  const craftingRecipes = [
    {
      itemName: "Iron Sword",
      itemType: ItemType.Weapon,
      itemTier: ItemTier.Tier1,
      componentsRequired: [
        { componentName: "Iron Ore", quantity: 5 },
        { componentName: "Wood", quantity: 2 },
      ],
      relicsRequired: [],
      craftingTime: 60,
    },
    {
      itemName: "Leather Armor",
      itemType: ItemType.Armor,
      itemTier: ItemTier.Tier1,
      componentsRequired: [
        { componentName: "Leather", quantity: 10 },
        { componentName: "Cloth", quantity: 5 },
      ],
      relicsRequired: [],
      craftingTime: 120,
    },
    // Add more recipes as needed
  ];
  await craftingRecipeRepository.save(craftingRecipes);

  // Seed Users
  const userRepository = connection.getRepository(User);
  const users = [
    {
      username: "adventurer1",
      inventory: { "Iron Ore": 10, "Oak Wood": 20 }
    },
    {
      username: "craftmaster",
      inventory: { "Iron Ingot": 5, "Leather": 15 }
    }
  ];
  await userRepository.save(users);

  // Seed MarketplaceListings
  const listingRepository = connection.getRepository(MarketplaceListing);
  const listings = [
    {
      seller: users[0],
      itemName: "Iron Sword",
      quantity: 1,
      price: 100,
      listed: new Date()
    },
    {
      seller: users[1],
      itemName: "Leather Armor",
      quantity: 1,
      price: 150,
      listed: new Date()
    }
  ];
  await listingRepository.save(listings);

  console.log("Database seeded successfully");
}

seedDatabase().catch(console.error);