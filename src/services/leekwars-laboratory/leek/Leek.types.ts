import { IEntity } from '../entity/Entity.types';

export interface ILeek extends IEntity {
  elo: number;
  aiFilePath: string;
  imageName: string;
}
