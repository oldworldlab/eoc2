import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ItemTier } from "../constants/item-tiers";

@Entity()
export class Relic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: "enum",
    enum: ItemTier,
  })
  tier!: ItemTier;

  @Column()
  description!: string;

  @Column()
  baseValue!: number;
}