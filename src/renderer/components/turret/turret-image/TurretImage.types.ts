import { TurretResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ITurretImageProps {
  turret: TurretResponse;
  showTooltip?: boolean;
  width?: number | string;
  height?: number | string;
}
