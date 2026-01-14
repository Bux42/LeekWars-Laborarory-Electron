export interface IEloProgressionItem {
  entityName: string;
  talent: number;
  timestamp: number;
}

export interface IGetEloProgressionByPoolRunIdResponse {
  eloProgression: IEloProgressionItem[];
  success: boolean;
}
