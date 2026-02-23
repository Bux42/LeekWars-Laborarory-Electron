import { IPoolDuel } from '../../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import { DuelPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolDuelListProps {
  pools: DuelPoolResponse[];
}
