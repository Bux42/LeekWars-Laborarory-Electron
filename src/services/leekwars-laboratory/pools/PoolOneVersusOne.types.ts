import { ILeek } from '../leek/Leek.types';

export interface IPoolOneVersusOneBase {
  name: string;
  id: string;
  total_fights: number;
  enabled: boolean;
}

export interface IPoolOneVersusOneRequest extends IPoolOneVersusOneBase {
  leek_ids: string[];
}

export interface IPoolOneVersusOneResponse extends IPoolOneVersusOneBase {
  leeks: ILeek[];
}
