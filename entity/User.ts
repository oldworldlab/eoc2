export interface User {
  id: number;
  username: string;
  inventory: { [itemName: string]: number };
}