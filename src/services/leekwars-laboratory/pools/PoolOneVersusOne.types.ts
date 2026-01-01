import { ILeek } from '../leek/Leek.types';

export interface IPoolOneVersusOne {
  leeks: ILeek[];
  name: string;
  id: string;
  total_fights: number;
  enabled: boolean;
}
