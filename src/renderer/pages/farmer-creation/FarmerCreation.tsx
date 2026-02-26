import { useMemo, useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmerCreationStyles as styles } from './FarmerCreation.styles';
import { useGetLeeksAll } from '../../../services/leeks/leeks';
import LeekPicker from '../../components/leek/leek-picker/LeekPicker';
import Input from '../../components/shared/input/Input';
import LeekList from '../../components/leek/leek-list/LeekList';
import { LeekResponse } from '../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';
import { usePostFarmersAdd } from '../../../services/farmers/farmers';

function FarmerCreation() {
  const [farmerName, setFarmerName] = useState('');
  const [selectedLeeks, setSelectedLeeks] = useState<LeekResponse[]>([]);
  const navigate = useNavigate();
  const farmers = [];

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

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Remove',
      onClick: () =>
        setSelectedLeeks((prev) => prev.filter((l) => l.id !== leek.id)),
      variant: 'danger',
    },
  ];

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
        <h2>Select leeks</h2>
        <LeekPicker
          label="Select at least one leek"
          availableLeeks={allLeeks?.leeks || []}
          onLeekSelect={onLeekSelect}
          selectedLeekIds={selectedLeeks.map((leek) => leek.id)}
        />
        <LeekList leeks={selectedLeeks} getDropdownItems={getDropdownItems} />
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!validFarmer}
        >
          Create Farmer
        </Button>
      </div>
    </>
  );
}

export default FarmerCreation;
