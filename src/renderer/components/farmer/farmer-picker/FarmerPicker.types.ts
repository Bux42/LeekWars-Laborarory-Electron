export interface IFarmerPickerProps {
  label: string;
  selectedFarmerIds: string[];
  onFarmerSelect: (farmerId: string) => void;
}
