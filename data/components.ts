import { ItemTier } from '../constants/item-tiers';

export interface Component {
  name: string;
  tier: ItemTier;
  gatheredFrom: string;
}

export const components: Component[] = [
  { name: 'Cloth', tier: ItemTier.Tier1, gatheredFrom: 'Harvesting' },
  { name: 'Leather', tier: ItemTier.Tier1, gatheredFrom: 'Skinning' },
  { name: 'Iron Ore', tier: ItemTier.Tier1, gatheredFrom: 'Mining' },
  { name: 'Steel Ingot', tier: ItemTier.Tier2, gatheredFrom: 'Smelting' },
  { name: 'Mithril Ingot', tier: ItemTier.Tier3, gatheredFrom: 'Mining' },
  { name: 'Adamantite Ingot', tier: ItemTier.Tier4, gatheredFrom: 'Mining' },
  { name: 'Orichalcum Ingot', tier: ItemTier.Tier5, gatheredFrom: 'Mining' },
  { name: 'Ethereal Metal', tier: ItemTier.Tier6, gatheredFrom: 'Alchemy' },
  { name: 'Astral Metal', tier: ItemTier.Tier7, gatheredFrom: 'Alchemy' },
  { name: 'Celestial Essence', tier: ItemTier.Tier8, gatheredFrom: 'Alchemy' },
  { name: 'Wood', tier: ItemTier.Tier1, gatheredFrom: 'Woodcutting' },
  { name: 'String', tier: ItemTier.Tier1, gatheredFrom: 'Harvesting' },
  { name: 'Gemstone', tier: ItemTier.Tier3, gatheredFrom: 'Mining' },
  { name: 'Magic Essence', tier: ItemTier.Tier4, gatheredFrom: 'Enchanting' },
];