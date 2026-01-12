import { ILeekScriptAI } from '../../leekwars-laboratory/leekscript-ai/LeekscriptAI.types';

export interface IGetAllLeekscriptAisResponse {
  leekscriptAis: ILeekScriptAI[];
  success: boolean;
}
