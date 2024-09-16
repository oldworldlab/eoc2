import { initializeDatabase, dummyData } from "../lib/database";

async function seedDatabase() {
  try {
    // Initialize the dummy database
    await initializeDatabase();

    // Add some dummy data
    dummyData.gatheringResources.push(
      { id: 3, resourceName: "Gold Ore", gatheringMethod: "Mining", locations: ["Gold Mountains"], tier: 2, baseGatherRate: 5 },
      { id: 4, resourceName: "Maple Wood", gatheringMethod: "Woodcutting", locations: ["Maple Forest"], tier: 2, baseGatherRate: 7 }
    );

    dummyData.users.push(
      { id: 3, username: "user3", inventory: { "Gold Ore": 5, "Maple Wood": 10 } }
    );

    dummyData.listings.push(
      { id: 3, sellerId: 3, itemName: "Gold Ingot", quantity: 2, price: 200, listed: new Date() }
    );

    console.log('Dummy database seeded successfully');
    console.log('Current dummy data:', JSON.stringify(dummyData, null, 2));
  } catch (error) {
    console.error('Error seeding the dummy database:', error);
  }
}

seedDatabase();