// import "reflect-metadata";
// import { DataSource, createConnection } from "typeorm";
// import { GatheringResource } from "../entity/GatheringResource";
// import { CraftingRecipe } from "../entity/CraftingRecipe";
// import { Component } from "../entity/Component";
// import { Relic } from "../entity/Relic";
// import { User } from "../entity/User";
// import { MarketplaceListing } from "../entity/MarketplaceListing";

// Dummy DataSource type
interface DummyDataSource {
  isInitialized: boolean;
}

let dataSource: DummyDataSource | null = null;

export async function initializeDatabase(): Promise<DummyDataSource> {
  if (!dataSource) {
    // Simulate database initialization
    dataSource = {
      isInitialized: true
    };
    console.log("Dummy database initialized");
  }
  return dataSource;
}

export function getConnection(): DummyDataSource {
  if (!dataSource || !dataSource.isInitialized) {
    throw new Error("Database connection not initialized");
  }
  return dataSource;
}

// Add any dummy data or functions you need for development
export const dummyData = {
  users: [
    { id: 1, username: "user1", inventory: {} },
    { id: 2, username: "user2", inventory: {} },
  ],
  listings: [
    { id: 1, sellerId: 1, itemName: "Sword", quantity: 1, price: 100, listed: new Date() },
    { id: 2, sellerId: 2, itemName: "Shield", quantity: 1, price: 150, listed: new Date() },
  ],
  recipes: [
    { id: 1, itemName: "Iron Sword", componentsRequired: [{ componentName: "Iron", quantity: 2 }, { componentName: "Wood", quantity: 1 }] },
    { id: 2, itemName: "Leather Armor", componentsRequired: [{ componentName: "Leather", quantity: 5 }] },
  ],
  components: [
    { id: 1, name: "Iron", tier: 1 },
    { id: 2, name: "Wood", tier: 1 },
    { id: 3, name: "Leather", tier: 1 },
  ],
  relics: [
    { id: 1, name: "Ancient Amulet", tier: 3 },
    { id: 2, name: "Mystic Orb", tier: 4 },
  ],
  gatheringResources: [
    { id: 1, resourceName: "Iron Ore", gatheringMethod: "Mining", locations: ["Iron Hills"], tier: 1, baseGatherRate: 10 },
    { id: 2, resourceName: "Oak Wood", gatheringMethod: "Woodcutting", locations: ["Ancient Forest"], tier: 1, baseGatherRate: 8 },
  ],
};