import { IEntityStats } from '../../../../services/leekwars-laboratory/types/entity/stats/EntityStats.types';

export interface IEntityStatsProps {
  // used for turrets to show the minimum stats at a certain level
  minStats?: IEntityStats;
  totalStats: IEntityStats;
}
