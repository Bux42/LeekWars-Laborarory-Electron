import { DuelPoolFightCountEvent } from './events/pool-run/duel/DuelPoolFightCountEvent.types';
import { FarmerPoolFightCountEvent } from './events/pool-run/farmer/FarmerPoolFightCountEvent.types';

// export type ServerEventType =
//   | 'DUEL_POOL_FIGHT_COUNT'
//   | 'DUEL_POOL_FIGHT_COUNT_2';

export type ServerEventMap = {
  DUEL_POOL_FIGHT_COUNT: DuelPoolFightCountEvent;
  FARMER_POOL_FIGHT_COUNT: FarmerPoolFightCountEvent;
};

export type ServerEventType = keyof ServerEventMap;

export type ServerEvent = {
  [K in ServerEventType]: {
    type: K;
    payload: ServerEventMap[K];
  };
}[ServerEventType];
