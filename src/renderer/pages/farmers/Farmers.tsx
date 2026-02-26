import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmersStyles as styles } from './Farmers.styles';
import { useGetFarmersAll } from '../../../services/farmers/farmers';
import FarmerCard from '../../components/farmer/farmer-card/FarmerCard';

function Farmers() {
  const navigate = useNavigate();

  const {
    data: farmersData,
    isLoading: farmersLoading,
    error: farmersError,
  } = useGetFarmersAll();

  if (farmersLoading) {
    return <p>Loading farmers...</p>;
  }

  if (farmersError) {
    return <p>Error loading farmers: {farmersError.message}</p>;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Farmers</h1>
        <Button onClick={() => navigate('/new-farmer')}>Add Farmer</Button>
      </div>

      {farmersData?.farmers.length === 0 ? (
        <p>No farmers found.</p>
      ) : (
        <div style={styles.farmerList}>
          {farmersData?.farmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      )}
    </>
  );
}

export default Farmers;
