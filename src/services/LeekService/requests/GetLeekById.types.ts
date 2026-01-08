import { ILeek } from '../../leekwars-laboratory/types/leek/Leek.types';

export interface IGetLeekByIdResponse {
  success: boolean;
  leek: ILeek;
}
