import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmersStyles as styles } from './Farmers.styles';
import { useGetFarmersAll } from '../../../services/farmers/farmers';
import FarmerCard from '../../components/farmer/FarmerCard';

function Farmers() {
  const navigate = useNavigate();

  const {
    data: farmersData,
    isLoading: farmersLoading,
    error: farmersError,
  } = useGetFarmersAll();

  return (
    <>
      <div style={styles.header}>
        <h1>Farmers</h1>
        <Button onClick={() => navigate('/new-farmer')}>Add Farmer</Button>
      </div>
      {farmersData?.farmers.length === 0 ? (
        <p>No farmers found.</p>
      ) : (
        farmersData?.farmers.map((farmer) => (
          <FarmerCard key={farmer.id} farmer={farmer} />
        ))
      )}
    </>
  );
}

export default Farmers;
