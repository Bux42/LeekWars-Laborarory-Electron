import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmerCreationStyles as styles } from './FarmerCreation.styles';
import { useGetLeeksAll } from '../../../services/leeks/leeks';
import LeekPicker from '../../components/leek/leek-picker/LeekPicker';
import { useState } from 'react';

function FarmerCreation() {
  const [selectedLeekIds, setSelectedLeekIds] = useState<string[]>([]);
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

  const onLeekSelect = (leekId: string) => {
    console.log('Selected leek ID:', leekId);
    setSelectedLeekIds((prevSelectedLeekIds) => {
      if (prevSelectedLeekIds.includes(leekId)) {
        return prevSelectedLeekIds.filter((id) => id !== leekId);
      }
      return [...prevSelectedLeekIds, leekId];
    });
  };

  return (
    <>
      <div style={styles.header}>
        <h1>Farmer Creation</h1>
      </div>
      <div style={styles.section}>
        <h2>Select leeks</h2>
        <LeekPicker
          label="Select up to 4 leeks"
          availableLeeks={allLeeks?.leeks || []}
          onLeekSelect={onLeekSelect}
          selectedLeekIds={selectedLeekIds}
        />
      </div>
    </>
  );
}

export default FarmerCreation;
