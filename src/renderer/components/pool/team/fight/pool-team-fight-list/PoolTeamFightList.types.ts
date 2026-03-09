import { PoolTeamResponse } from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolTeamFightListProps {
  teams: PoolTeamResponse[];
  poolTeamId: string;
}
