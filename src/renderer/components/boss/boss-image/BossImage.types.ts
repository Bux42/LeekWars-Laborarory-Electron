import { MobResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface IBossImageProps {
  boss: MobResponse;
  showTooltip?: boolean;
  height: number;
  width: number;
}
