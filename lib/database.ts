import "reflect-metadata";
import { DataSource } from "typeorm";
import { GatheringResource } from "../entity/GatheringResource";
import { CraftingRecipe } from "../entity/CraftingRecipe";
import { Component } from "../entity/Component";
import { Relic } from "../entity/Relic";
import { User } from "../entity/User";
import { MarketplaceListing } from "../entity/MarketplaceListing";

let dataSource: DataSource | null = null;

export async function initializeDatabase(): Promise<DataSource> {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "sqlite",
      database: "database.sqlite",
      entities: [GatheringResource, CraftingRecipe, Component, Relic, User, MarketplaceListing],
      synchronize: true,
      logging: false
    });

    await dataSource.initialize();
  }
  return dataSource;
}

export function getConnection(): DataSource {
  if (!dataSource || !dataSource.isInitialized) {
    throw new Error("Database connection not initialized");
  }
  return dataSource;
}