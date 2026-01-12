import { ILeekScriptAI } from '../../leekwars-laboratory/leekscript-ai/LeekscriptAI.types';

export interface IGetAllLeekscriptAisRequest {
  removeCode?: boolean;
}

export interface IGetAllLeekscriptAisResponse {
  leekscriptAis: ILeekScriptAI[];
  success: boolean;
}
