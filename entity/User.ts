import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MarketplaceListing } from "./MarketplaceListing";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column("simple-json")
  inventory!: { [itemName: string]: number };

  @OneToMany(() => MarketplaceListing, listing => listing.seller)
  listings!: MarketplaceListing[];
}