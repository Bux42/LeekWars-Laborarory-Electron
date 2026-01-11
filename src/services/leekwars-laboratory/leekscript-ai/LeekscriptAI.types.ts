import { IGitInfos } from './GitInfos.types';
import { IMergedCode } from './MergedCode.types';

export interface ILeekScriptAI {
  id: string;
  gitInfos: IGitInfos;
  mergedCode: IMergedCode;
}
