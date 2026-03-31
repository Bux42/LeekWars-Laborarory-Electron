import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekImageHoverProps {
  leek: LeekResponse;
  height?: number;
  width?: number;
}
