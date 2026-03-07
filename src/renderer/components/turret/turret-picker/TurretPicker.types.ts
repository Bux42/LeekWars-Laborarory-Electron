import { TurretResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ITurretPickerProps {
  label: string;
  availableTurrets: TurretResponse[];
  selectedTurretId: string | undefined;
  onTurretSelect: (TurretId: string) => void;
}
