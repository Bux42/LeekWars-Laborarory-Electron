import { IEntity } from '../entity/Entity.types';

export interface ILeek extends IEntity {
  id: string;
  elo: number;
  aiId: string;
  mergedCodeHash?: string;
  imageName: string;
}
