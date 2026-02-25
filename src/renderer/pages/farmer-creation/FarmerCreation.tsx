import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmerCreationStyles as styles } from './FarmerCreation.styles';
import { useGetLeeksAll } from '../../../services/leeks/leeks';

function FarmerCreation() {
  const navigate = useNavigate();
  const farmers = [];

  const {
    data: allLeeks,
    isLoading,
    error,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Farmer Creation</h1>
      </div>
      <div style={styles.section}>
        <h2>Build Preview</h2>
        <EntityBuild entityBuild={entityBuild} />
      </div>
    </div>
  );
}

export default FarmerCreation;
