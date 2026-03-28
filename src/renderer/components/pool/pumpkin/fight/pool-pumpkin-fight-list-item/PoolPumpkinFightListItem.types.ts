import {
  PoolFightPumpkinResponse,
  PoolLeekGroupResponse,
} from '../../../../../../services/leekwarsToolsAPI.schemas';

export interface IPoolPumpkinFightListItemProps {
  leekGroup: PoolLeekGroupResponse;
  fight: PoolFightPumpkinResponse;
}
