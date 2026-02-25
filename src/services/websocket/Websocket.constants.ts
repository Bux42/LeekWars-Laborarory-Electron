import { DuelPoolFightCountEvent } from './events/pool-run/duel/DuelPoolFightCountEvent.types';

// export type ServerEventType =
//   | 'DUEL_POOL_FIGHT_COUNT'
//   | 'DUEL_POOL_FIGHT_COUNT_2';

export type ServerEventMap = {
  DUEL_POOL_FIGHT_COUNT: DuelPoolFightCountEvent;
  DUEL_POOL_FIGHT_COUNT_2: DuelPoolFightCountEvent;
};

export type ServerEventType = keyof ServerEventMap;

export type ServerEvent = {
  [K in ServerEventType]: {
    type: K;
    payload: ServerEventMap[K];
  };
}[ServerEventType];
