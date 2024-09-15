import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ItemTier } from "../constants/item-tiers";
import { GatheringMethod } from "../types/gathering-methods";

@Entity()
export class GatheringResource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  resourceName!: string;

  @Column({
    type: "enum",
    enum: GatheringMethod,
  })
  gatheringMethod!: GatheringMethod;

  @Column("simple-array")
  locations!: string[];

  @Column({
    type: "enum",
    enum: ItemTier,
  })
  tier!: ItemTier;

  @Column()
  baseGatherRate!: number;
}