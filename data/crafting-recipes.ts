import { ItemTier } from '../constants/item-tiers';
import { ArmorMaterial, ArmorPart, WeaponType } from '../types/item-types';
import { components } from './components';

interface CraftingRecipe {
  itemName: string;
  itemTier: ItemTier;
  componentsRequired: { componentName: string; quantity: number }[];
}

export const craftingRecipes: CraftingRecipe[] = [];

function generateArmorRecipes() {
  const armorMaterials: ArmorMaterial[] = ['Cloth', 'Leather', 'Plate', 'Chain'];
  const armorParts: ArmorPart[] = ['Chest', 'Legs', 'Gloves', 'Hood', 'Boots'];

  armorMaterials.forEach((material) => {
    armorParts.forEach((part) => {
      for (let tier = ItemTier.Common; tier <= ItemTier.Celestial; tier++) {
        const itemName = `${ItemTier[tier]} ${material} ${part}`;
        const componentsRequired = getArmorComponents(material, tier);
        craftingRecipes.push({
          itemName,
          itemTier: tier,
          componentsRequired,
        });
      }
    });
  });
}

function generateWeaponRecipes() {
  const weaponTypes: WeaponType[] = [
    'Axe', 'Dual Axes', 'Sword', 'Frost Staff', 'Fire Staff', 'Holy Staff', 'Bow', 'Crossbow',
  ];

  weaponTypes.forEach((weapon) => {
    for (let tier = ItemTier.Common; tier <= ItemTier.Celestial; tier++) {
      const itemName = `${ItemTier[tier]} ${weapon}`;
      const componentsRequired = getWeaponComponents(weapon, tier);
      craftingRecipes.push({
        itemName,
        itemTier: tier,
        componentsRequired,
      });
    }
  });
}

function getArmorComponents(material: ArmorMaterial, tier: ItemTier) {
  const componentsRequired = [];
  const baseMaterial = getBaseMaterial(material, tier);
  componentsRequired.push({ componentName: baseMaterial, quantity: tier * 5 });

  if (tier >= ItemTier.Rare) {
    componentsRequired.push({ componentName: 'Gemstone', quantity: tier - 2 });
  }
  if (tier >= ItemTier.Epic) {
    componentsRequired.push({ componentName: 'Magic Essence', quantity: tier - 3 });
  }
  if (tier === ItemTier.Celestial) {
    componentsRequired.push({ componentName: 'Celestial Essence', quantity: 1 });
  }

  return componentsRequired;
}

function getWeaponComponents(weapon: WeaponType, tier: ItemTier) {
  const componentsRequired = [];

  if (['Axe', 'Dual Axes', 'Sword'].includes(weapon)) {
    const metal = getMetalForTier(tier);
    componentsRequired.push({ componentName: metal, quantity: tier * 7 });
    componentsRequired.push({ componentName: 'Wood', quantity: tier * 2 });
  } else if (['Bow', 'Crossbow'].includes(weapon)) {
    componentsRequired.push({ componentName: 'Wood', quantity: tier * 5 });
    componentsRequired.push({ componentName: 'String', quantity: tier * 3 });
  } else if (['Frost Staff', 'Fire Staff', 'Holy Staff'].includes(weapon)) {
    componentsRequired.push({ componentName: 'Wood', quantity: tier * 4 });
    componentsRequired.push({ componentName: 'Magic Essence', quantity: tier });
  }

  if (tier >= ItemTier.Rare) {
    componentsRequired.push({ componentName: 'Gemstone', quantity: tier - 2 });
  }
  if (tier === ItemTier.Celestial) {
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
    case 'Plate':
    case 'Chain':
      return getMetalForTier(tier);
    default:
      return 'Unknown Material';
  }
}

function getMetalForTier(tier: ItemTier): string {
  switch (tier) {
    case ItemTier.Common:
      return 'Iron Ore';
    case ItemTier.Uncommon:
      return 'Steel Ingot';
    case ItemTier.Rare:
      return 'Mithril Ingot';
    case ItemTier.Epic:
      return 'Adamantite Ingot';
    case ItemTier.Legendary:
      return 'Orichalcum Ingot';
    case ItemTier.Mythic:
      return 'Ethereal Metal';
    case ItemTier.Divine:
      return 'Astral Metal';
    case ItemTier.Celestial:
      return 'Celestial Metal';
    default:
      return 'Unknown Metal';
  }
}

generateArmorRecipes();
generateWeaponRecipes();