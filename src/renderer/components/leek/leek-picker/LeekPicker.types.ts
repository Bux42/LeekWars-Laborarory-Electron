import { ILeek } from '../../../../services/leekwars-laboratory/types/leek/Leek.types';

export interface ILeekPickerProps {
  availableLeeks: ILeek[];
  selectedLeekIds: string[];
  onLeekSelect: (leekId: string) => void;
}
