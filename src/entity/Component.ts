import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ItemTier } from "../../constants/item-tiers";  // Note the change here

@Entity()
export class Component {
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
  gatheredFrom!: string;

  @Column()
  baseValue!: number;
}