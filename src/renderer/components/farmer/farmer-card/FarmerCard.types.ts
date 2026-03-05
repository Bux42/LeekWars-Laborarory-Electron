import { FarmerResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface IFarmerCardProps {
  farmer: FarmerResponse;
  showAddLeekButton?: boolean;
  showRemoveFarmerButton?: boolean;
  onRemoveFarmer?: (farmerId: string) => void;
}
