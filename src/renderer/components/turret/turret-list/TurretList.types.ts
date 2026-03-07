import { TurretResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../shared/dropdown/Dropdown.types';

export interface ITurretListProps {
  turrets: TurretResponse[];
  getDropdownItems?: (turret: TurretResponse) => IDropdownItem[];
}
