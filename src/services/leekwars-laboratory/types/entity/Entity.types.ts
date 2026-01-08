import { IEntityBuild } from '../builds/EntityBuild.types';

export interface IEntity {
  build: IEntityBuild;
  name: string;
}
