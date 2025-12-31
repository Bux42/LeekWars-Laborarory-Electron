import { IEntityStats } from '../entity/stats/EntityStats.types';

export interface IEntityBuild {
  level: number;
  investedStats: IEntityStats;
  investedCapital: number;
  bonusStats: IEntityStats;
  equippedComponentIds: number[];
  selectedWeaponIds: number[];
  selectedChipIds: number[];
  totalCapital: number;
}
