import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmersStyles as styles } from './Farmers.styles';
import {
  useDeleteFarmersDeleteFarmerId,
  useGetFarmersAll,
} from '../../../services/farmers/farmers';
import FarmerCard from '../../components/farmer/farmer-card/FarmerCard';
import Spinner from '../../components/shared/spinner/Spinner';
import { FarmerResponse } from '../../../services/leekwarsToolsAPI.schemas';

function Farmers() {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState<FarmerResponse[]>([]);

  const {
    data: farmersData,
    isLoading: farmersLoading,
    error: farmersError,
  } = useGetFarmersAll();

  const deleteFarmerMutation = useDeleteFarmersDeleteFarmerId();

  useEffect(() => {
    if (farmersData?.farmers) {
      setFarmers(farmersData.farmers);
    }
  }, [farmersData]);

  const handleRemoveFarmer = (farmerId: string) => {
    if (
      window.confirm(
        'Are you sure you want to remove this farmer? (NOT HOOKED UP TO BACKEND YET)',
      )
    ) {
      try {
        deleteFarmerMutation.mutate({ farmerId });
        setFarmers((prevFarmers) =>
          prevFarmers.filter((farmer) => farmer.id !== farmerId),
        );
      } catch {
        alert('Failed to remove farmer. Please try again.');
      }
    }
  };

  if (farmersLoading) {
    return <Spinner size="small" label="Loading farmers..." />;
  }

  if (farmersError) {
    return <Result status="error" title="Error loading farmers" />;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Farmers</h1>
        <Button onClick={() => navigate('/new-farmer')}>Add Farmer</Button>
      </div>

      {farmers.length === 0 ? (
        <Result status="info" title="No farmers found." />
      ) : (
        <div style={styles.farmerList}>
          {farmers.map((farmer) => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              showRemoveFarmerButton
              onRemoveFarmer={handleRemoveFarmer}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Farmers;
