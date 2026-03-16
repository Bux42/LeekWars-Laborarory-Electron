import {
  LeekResponse,
  PoolLeekResponse,
} from '../../services/leekwarsToolsAPI.schemas';

export function PoolLeekResponseToLeekResponse(
  poolLeekResponse: PoolLeekResponse,
): LeekResponse {
  return { ...poolLeekResponse, creationDate: 0 };
}
