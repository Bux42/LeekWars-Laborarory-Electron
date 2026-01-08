import { IEntityStats } from '../../services/leekwars-laboratory/types/entity/stats/EntityStats.types';

export function getBaseStats(level: number): IEntityStats {
  return {
    life: 100 + (level - 1) * 3,
    strength: 0,
    wisdom: 0,
    agility: 0,
    resistance: 0,
    science: 0,
    magic: 0,
    frequency: 100,
    cores: 1,
    ram: 6,
    tp: 10,
    mp: 3,
  };
}
