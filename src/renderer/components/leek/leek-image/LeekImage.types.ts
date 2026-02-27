import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekImageProps {
  leek: LeekResponse;
  showTooltip?: boolean;
  height?: number;
  width?: number;
}
