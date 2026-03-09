import { CreateBasePoolRequest } from '../../../services/leekwarsToolsAPI.schemas';

export const DEFAULT_BASE_POOL: CreateBasePoolRequest = {
  deterministic: false,
  enabled: false,
  fightLimit: 10,
  fightLimitEnabled: true,
  name: '',
  resetElo: true,
  startSeed: 1,
};

export type PoolType = 'duel' | 'farmer' | 'team';
