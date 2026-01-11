import { ILeekScriptAI } from '../../leekwars-laboratory/leekscript-ai/LeekscriptAI.types';

export interface IGetByMergedCodeHashRequest {
  mergedCodeHash: string;
}

export interface IGetByMergedCodeHashResponse {
  codeSnapshot: ILeekScriptAI;
  success: boolean;
}
