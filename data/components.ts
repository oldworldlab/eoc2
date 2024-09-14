import { ItemTier } from '../constants/item-tiers';

export interface Component {
  name: string;
  tier: ItemTier;
  gatheredFrom: string;
}

export const components: Component[] = [
  { name: 'Cloth', tier: ItemTier.Common, gatheredFrom: 'Harvesting' },
  { name: 'Leather', tier: ItemTier.Common, gatheredFrom: 'Skinning' },
  { name: 'Iron Ore', tier: ItemTier.Common, gatheredFrom: 'Mining' },
  { name: 'Steel Ingot', tier: ItemTier.Uncommon, gatheredFrom: 'Smelting' },
  { name: 'Mithril Ingot', tier: ItemTier.Rare, gatheredFrom: 'Mining' },
  { name: 'Adamantite Ingot', tier: ItemTier.Epic, gatheredFrom: 'Mining' },
  { name: 'Orichalcum Ingot', tier: ItemTier.Legendary, gatheredFrom: 'Mining' },
  { name: 'Ethereal Metal', tier: ItemTier.Mythic, gatheredFrom: 'Alchemy' },
  { name: 'Astral Metal', tier: ItemTier.Divine, gatheredFrom: 'Alchemy' },
  { name: 'Celestial Essence', tier: ItemTier.Celestial, gatheredFrom: 'Alchemy' },
  { name: 'Wood', tier: ItemTier.Common, gatheredFrom: 'Woodcutting' },
  { name: 'String', tier: ItemTier.Common, gatheredFrom: 'Harvesting' },
  { name: 'Gemstone', tier: ItemTier.Rare, gatheredFrom: 'Mining' },
  { name: 'Magic Essence', tier: ItemTier.Epic, gatheredFrom: 'Enchanting' },
];