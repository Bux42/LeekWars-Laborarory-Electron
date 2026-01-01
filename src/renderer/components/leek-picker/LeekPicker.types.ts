import { ILeek } from '../../../services/leekwars-laboratory/leek/Leek.types';

export interface ILeekPickerProps {
  availableLeeks: ILeek[];
  selectedLeekIds: string[];
  onLeekSelect: (leekId: string) => void;
}
