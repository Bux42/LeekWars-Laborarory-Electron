import {
  PoolTeamResponse,
  TeamResponse,
} from '../../services/leekwarsToolsAPI.schemas';
import { PoolLeekResponseToLeekResponse } from './LeekMapper';

export function PoolTeamResponseToTeamResponse(
  poolTeamResponse: PoolTeamResponse,
): TeamResponse {
  return {
    ...poolTeamResponse,
    leeks: poolTeamResponse.leeks.map((leek) =>
      PoolLeekResponseToLeekResponse(leek),
    ),
    creationDate: 0,
    lastUpdateDate: 0,
  };
}
