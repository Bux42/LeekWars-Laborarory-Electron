import { FarmerResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface IFarmerPickerProps {
  label: string;
  availableFarmers: FarmerResponse[];
  selectedFarmerIds: string[];
  onFarmerSelect: (farmerId: string) => void;
}
