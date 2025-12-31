import { IEntity } from '../entity/Entity.types';

export interface ILeek extends IEntity {
  id: number;
  elo: number;
  aiFilePath: string;
  imageName: string;
}
