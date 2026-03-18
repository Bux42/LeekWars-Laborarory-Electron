import { useMemo, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmerCreationStyles as styles } from './FarmerCreation.styles';
import { useGetLeeksAll } from '../../../services/leeks/leeks';
import Input from '../../components/shared/input/Input';
import LeekList from '../../components/leek/leek-list/LeekList';
import { LeekResponse } from '../../../services/leekwarsToolsAPI.schemas';
import { usePostFarmersAdd } from '../../../services/farmers/farmers';
import Spinner from '../../components/shared/spinner/Spinner';

function FarmerCreation() {
  const [farmerName, setFarmerName] = useState('');
  const [selectedLeeks, setSelectedLeeks] = useState<LeekResponse[]>([]);
  const navigate = useNavigate();

  const postFarmersAddMutation = usePostFarmersAdd();

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
    setSelectedLeeks((prevSelectedLeeks) => {
      const leek = allLeeks?.leeks.find((l) => l.id === leekId);
      if (!leek) return prevSelectedLeeks;
      if (prevSelectedLeeks.includes(leek)) {
        return prevSelectedLeeks.filter((l) => l.id !== leekId);
      }
      return [...prevSelectedLeeks, leek];
    });
  };

  const onRemoveLeek = (leekId: string) => {
    setSelectedLeeks((prevSelectedLeeks) =>
      prevSelectedLeeks.filter((l) => l.id !== leekId),
    );
  };

  const handleSubmit = async () => {
    try {
      await postFarmersAddMutation.mutateAsync({
        data: {
          name: farmerName,
          leekIds: selectedLeeks.map((leek) => leek.id),
        },
      });
      navigate('/farmers');
    } catch (err) {
      console.error('Failed to create farmer:', err);
      alert('Failed to create farmer. Please try again.');
    }
  };

  const validFarmer = useMemo(() => {
    return farmerName.trim() !== '' && selectedLeeks.length > 0;
  }, [farmerName, selectedLeeks]);

  const availableLeeks = useMemo(() => {
    if (!allLeeks) return [];
    const poolLeekIds = new Set(selectedLeeks.map((leek) => leek.id));
    return allLeeks.leeks.filter((leek) => !poolLeekIds.has(leek.id));
  }, [allLeeks, selectedLeeks]);

  if (isLoading) {
    return <Spinner size="small" label="Loading leeks..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading leeks" />;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Farmer Creation</h1>
      </div>
      <Input
        placeholder="Enter farmer name"
        value={farmerName}
        onChange={(value) => setFarmerName(value)}
      />
      <div style={styles.section}>
        <h3>Selected leeks ({selectedLeeks.length})</h3>
        <LeekList leeks={selectedLeeks} onRemoveLeek={onRemoveLeek} />
        <h3>Available leeks ({availableLeeks.length})</h3>
        <LeekList leeks={availableLeeks} onAddLeek={onLeekSelect} />
        <Button onClick={handleSubmit} disabled={!validFarmer}>
          Create Farmer
        </Button>
      </div>
    </>
  );
}

export default FarmerCreation;
