import { IEntity } from '../entity/Entity.types';

export interface ILeek extends IEntity {
  id: string;
  elo: number;
  aiFilePath: string;
  imageName: string;
}
