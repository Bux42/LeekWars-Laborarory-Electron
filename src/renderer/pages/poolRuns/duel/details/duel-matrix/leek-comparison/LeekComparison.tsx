import LeekDetail from '../../../../../../components/leek/leek-detail/LeekDetail';
import { ILeekComparisonProps } from './LeekComparison.types';
import { leekComparisonStyles as styles } from './LeekComparison.styles';
import { PoolLeekResponseToLeekResponse } from '../../../../../../mappers/LeekMapper';

function LeekComparison({ leek1, leek2, value }: ILeekComparisonProps) {
  return (
    <div style={styles.container}>
      <div style={styles.leekDetailContainer}>
        <LeekDetail leek={PoolLeekResponseToLeekResponse(leek1)} />
      </div>
      <div style={styles.vsAndValueContainer}>
        <div style={styles.vsText}>VS</div>
        <div style={styles.valueContainer}>{value.toFixed(2)}%</div>
      </div>
      {/* Spacer between the two details */}
      <div style={styles.leekDetailContainer}>
        <LeekDetail leek={PoolLeekResponseToLeekResponse(leek2)} />
      </div>
    </div>
  );
}

export default LeekComparison;
