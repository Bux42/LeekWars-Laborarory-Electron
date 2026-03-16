import { PoolTeamResponse } from '../../../../../../../../services/leekwarsToolsAPI.schemas';

export interface ITeamComparisonProps {
  team1: PoolTeamResponse;
  team2: PoolTeamResponse;
  value: number;
}
