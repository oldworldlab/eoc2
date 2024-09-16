import { ItemTier } from '../constants/item-tiers';
import { ArmorMaterial, ArmorPart, WeaponType, ItemType, ArmorType } from '../types/item-types';
import { components } from './components';

interface CraftingRecipe {
  itemName: string;
  itemTier: ItemTier;
  itemType: ItemType;
  armorType?: ArmorType;
  weaponType?: WeaponType;
  componentsRequired: { componentName: string; quantity: number }[];
}

export const craftingRecipes: CraftingRecipe[] = [];

function generateArmorRecipes() {
  const armorMaterials: ArmorMaterial[] = ['Cloth', 'Leather', 'Mail', 'Plate'];
  const armorParts: ArmorPart[] = ['Head', 'Chest', 'Legs', 'Feet', 'Hands'];

  armorMaterials.forEach((material) => {
    armorParts.forEach((part) => {
      for (let tier = ItemTier.Tier1; tier <= ItemTier.Tier8; tier++) {
        const itemName = `${ItemTier[tier]} ${material} ${part}`;
        const componentsRequired = getArmorComponents(material, tier);
        craftingRecipes.push({
          itemName,
          itemTier: tier,
          itemType: ItemType.Armor,
          armorType: getArmorType(part),
          componentsRequired,
        });
      }
    });
  });
}

function generateWeaponRecipes() {
  const weaponTypes: WeaponType[] = [
    WeaponType.Axe,
    WeaponType.Sword,
    WeaponType.Bow,
    WeaponType.Staff,
    WeaponType.Dagger,
  ];

  weaponTypes.forEach((weapon) => {
    for (let tier = ItemTier.Tier1; tier <= ItemTier.Tier8; tier++) {
      const itemName = `${ItemTier[tier]} ${weapon}`;
      const componentsRequired = getWeaponComponents(weapon, tier);
      craftingRecipes.push({
        itemName,
        itemTier: tier,
        itemType: ItemType.Weapon,
        weaponType: weapon,
        componentsRequired,
      });
    }
  });
}

function getArmorComponents(material: ArmorMaterial, tier: ItemTier): { componentName: string; quantity: number }[] {
  const componentsRequired: { componentName: string; quantity: number }[] = [];
  const baseMaterial = getBaseMaterial(material, tier);
  componentsRequired.push({ componentName: baseMaterial, quantity: tier * 5 });

  if (tier >= ItemTier.Tier3) {
    componentsRequired.push({ componentName: 'Gemstone', quantity: tier - 2 });
  }
  if (tier >= ItemTier.Tier4) {
    componentsRequired.push({ componentName: 'Magic Essence', quantity: tier - 3 });
  }
  if (tier === ItemTier.Tier8) {
    componentsRequired.push({ componentName: 'Celestial Essence', quantity: 1 });
  }

  return componentsRequired;
}

function getWeaponComponents(weapon: WeaponType, tier: ItemTier): { componentName: string; quantity: number }[] {
  const componentsRequired: { componentName: string; quantity: number }[] = [];

  if ([WeaponType.Axe, WeaponType.Sword, WeaponType.Dagger].includes(weapon)) {
    const metal = getMetalForTier(tier);
    componentsRequired.push({ componentName: metal, quantity: tier * 7 });
    componentsRequired.push({ componentName: 'Wood', quantity: tier * 2 });
  } else if (weapon === WeaponType.Bow) {
    componentsRequired.push({ componentName: 'Wood', quantity: tier * 5 });
    componentsRequired.push({ componentName: 'String', quantity: tier * 3 });
  } else if (weapon === WeaponType.Staff) {
    componentsRequired.push({ componentName: 'Wood', quantity: tier * 4 });
    componentsRequired.push({ componentName: 'Magic Essence', quantity: tier });
  }

  if (tier >= ItemTier.Tier3) {
    componentsRequired.push({ componentName: 'Gemstone', quantity: tier - 2 });
  }
  if (tier === ItemTier.Tier8) {
    componentsRequired.push({ componentName: 'Celestial Essence', quantity: 1 });
  }

  return componentsRequired;
}

function getBaseMaterial(material: ArmorMaterial, tier: ItemTier): string {
  switch (material) {
    case 'Cloth':
      return 'Cloth';
    case 'Leather':
      return 'Leather';
    case 'Mail':
    case 'Plate':
      return getMetalForTier(tier);
    default:
      return 'Unknown Material';
  }
}

function getMetalForTier(tier: ItemTier): string {
  switch (tier) {
    case ItemTier.Tier1:
      return 'Iron Ore';
    case ItemTier.Tier2:
      return 'Steel Ingot';
    case ItemTier.Tier3:
      return 'Mithril Ingot';
    case ItemTier.Tier4:
      return 'Adamantite Ingot';
    case ItemTier.Tier5:
      return 'Orichalcum Ingot';
    case ItemTier.Tier6:
      return 'Ethereal Metal';
    case ItemTier.Tier7:
      return 'Astral Metal';
    case ItemTier.Tier8:
      return 'Celestial Metal';
    default:
      return 'Unknown Metal';
  }
}

function getArmorType(part: ArmorPart): ArmorType {
  switch (part) {
    case 'Head':
      return ArmorType.Helmet;
    case 'Chest':
      return ArmorType.Chestplate;
    case 'Legs':
      return ArmorType.Leggings;
    case 'Feet':
      return ArmorType.Boots;
    case 'Hands':
      return ArmorType.Gloves;
    default:
      throw new Error('Invalid armor part');
  }
}

generateArmorRecipes();
generateWeaponRecipes();