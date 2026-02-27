import {
  PoolFightDuelResponse,
  PoolLeekResponse,
} from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolDuelFightListItemProps {
  fight: PoolFightDuelResponse;
  leek1: PoolLeekResponse;
  leek2: PoolLeekResponse;
}
