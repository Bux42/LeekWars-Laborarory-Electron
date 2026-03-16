import FarmerCard from '../../../../../../../components/farmer/farmer-card/FarmerCard';
import { IFarmerComparisonProps } from './FarmerComparison.types';
import { farmerComparisonStyles as styles } from './FarmerComparison.styles';

function FarmerComparison({ farmer1, farmer2, value }: IFarmerComparisonProps) {
  return (
    <div style={styles.container}>
      <div style={styles.farmerDetailContainer}>
        <FarmerCard farmer={farmer1} />
      </div>
      <div style={styles.vsAndValueContainer}>
        <div style={styles.vsText}>VS</div>
        <div style={styles.valueContainer}>{value.toFixed(2)}%</div>
      </div>
      {/* Spacer between the two details */}
      <div style={styles.farmerDetailContainer}>
        <FarmerCard farmer={farmer2} />
      </div>
    </div>
  );
}

export default FarmerComparison;
