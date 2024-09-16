export enum ItemType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Potion = 'Potion',
  Food = 'Food',
  Material = 'Material',
  Relic = 'Relic',
}

export enum ArmorType {
  Helmet = 'Helmet',
  Chestplate = 'Chestplate',
  Leggings = 'Leggings',
  Boots = 'Boots',
  Gloves = 'Gloves',
}

export enum WeaponType {
  Sword = 'Sword',
  Axe = 'Axe',
  Bow = 'Bow',
  Staff = 'Staff',
  Dagger = 'Dagger',
}

export type ArmorMaterial = 'Cloth' | 'Leather' | 'Mail' | 'Plate';

export type ArmorPart = 'Head' | 'Chest' | 'Legs' | 'Feet' | 'Hands';