import { IGitInfos } from './GitInfos.types';
import { IMergedCode } from './MergedCode.types';

export interface ILeekScriptAI {
  id: string;
  name: string;
  description: string;
  originalFilePath: string;
  creationDate: number;
  gitInfos: IGitInfos;
  mergedCode: IMergedCode;
}
