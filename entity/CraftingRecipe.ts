import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ItemTier } from "../constants/item-tiers";
import { ItemType, ArmorType, WeaponType } from "../types/item-types";

@Entity()
export class CraftingRecipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemName!: string;

  @Column({
    type: "enum",
    enum: ItemType,
  })
  itemType!: ItemType;

  @Column({
    type: "enum",
    enum: ArmorType,
    nullable: true,
  })
  armorType?: ArmorType;

  @Column({
    type: "enum",
    enum: WeaponType,
    nullable: true,
  })
  weaponType?: WeaponType;

  @Column({
    type: "enum",
    enum: ItemTier,
  })
  itemTier!: ItemTier;

  @Column("simple-json")
  componentsRequired!: { componentName: string; quantity: number }[];

  @Column("simple-json")
  relicsRequired!: { relicName: string; quantity: number }[];

  @Column()
  craftingTime!: number;
}