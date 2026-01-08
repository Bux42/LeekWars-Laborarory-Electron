import { ILeek } from '../types/leek/Leek.types';

export interface IPoolOneVersusOneBase {
  name: string;
  id: string;
  total_executed_fights: number;
  enabled: boolean;
  fight_count_limit_enabled: boolean;
  fight_count_limit: number;
}

export interface IPoolOneVersusOneRequest extends IPoolOneVersusOneBase {
  leek_ids: string[];
}

export interface IPoolOneVersusOneResponse extends IPoolOneVersusOneBase {
  leeks: ILeek[];
}
