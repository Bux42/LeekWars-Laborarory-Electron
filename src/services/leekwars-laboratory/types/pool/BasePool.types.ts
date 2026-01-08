export interface IBasePool {
  enabled: boolean;
  resetElo: boolean;
  deterministic: boolean;
  startSeed: number;
  fightLimitEnabled: boolean;
  fightLimit: number;
  name: string;
  id: string;
}
