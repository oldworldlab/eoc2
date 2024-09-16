import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ItemTier } from "../../constants/item-tiers";  // Note the change here
import { ItemType, ArmorType, WeaponType } from "../../types/item-types";  // Note the change here

@Entity()
export class CraftingRecipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemName!: string;

  @Column({
    type: "simple-enum",
    enum: ItemType,
  })
  itemType!: ItemType;

  @Column({
    type: "simple-enum",
    enum: ArmorType,
    nullable: true,
  })
  armorType?: ArmorType;

  @Column({
    type: "simple-enum",
    enum: WeaponType,
    nullable: true,
  })
  weaponType?: WeaponType;

  @Column({
    type: "simple-enum",
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