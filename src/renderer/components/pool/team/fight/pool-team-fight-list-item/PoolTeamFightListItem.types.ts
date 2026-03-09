import {
  PoolTeamResponse,
  PoolFightTeamResponse,
} from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolTeamFightListItemProps {
  fight: PoolFightTeamResponse;
  team1: PoolTeamResponse;
  team2: PoolTeamResponse;
}
