import {
  PoolFightDuelResponse,
  PoolLeekResponse,
} from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolDuelFightCardProps {
  fight: PoolFightDuelResponse;
  leek1: PoolLeekResponse;
  leek2: PoolLeekResponse;
}
