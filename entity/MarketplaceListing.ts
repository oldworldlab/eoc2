import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class MarketplaceListing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.listings)
  seller!: User;

  @Column()
  itemName!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @Column()
  listed!: Date;
}