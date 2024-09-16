export interface GatheringResource {
  resourceName: string;
  gatheringMethod: string;
  locations: string[];
  tier: number;
  baseGatherRate: number;
}