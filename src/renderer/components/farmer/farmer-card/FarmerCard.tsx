import { useEffect, useMemo, useState } from 'react';
import { Button, Result } from 'antd';
import { farmerCardStyles as styles } from './FarmerCard.styles';
import LeekList from '../../leek/leek-list/LeekList';
import { IDropdownItem } from '../../shared/dropdown/Dropdown.types';
import {
  useDeleteFarmersFarmerIdRemoveLeekLeekId,
  usePostFarmersFarmerIdAddLeekLeekId,
} from '../../../../services/farmers/farmers';
import {
  FarmerResponse,
  LeekResponse,
} from '../../../../services/leekwarsToolsAPI.schemas';
import { useGetLeeksAll } from '../../../../services/leeks/leeks';
import { IFarmerCardProps } from './FarmerCard.types';
import Spinner from '../../shared/spinner/Spinner';

function FarmerCard({
  farmer,
  showAddLeekButton = true,
  showRemoveFarmerButton = false,
  onRemoveFarmer,
}: IFarmerCardProps) {
  const [farmerResponse, setFarmerResponse] = useState<FarmerResponse>(farmer);
  const [isAddingLeek, setIsAddingLeek] = useState(false);
  const [selectedLeekIds, setSelectedLeekIds] = useState<string[]>([]);

  const removeFarmerLeekMutation = useDeleteFarmersFarmerIdRemoveLeekLeekId();
  const addFarmerLeekMutation = usePostFarmersFarmerIdAddLeekLeekId();

  const {
    data: leeksData,
    isLoading: leeksLoading,
    error: leeksError,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  useEffect(() => {
    if (farmerResponse.leeks) {
      setSelectedLeekIds(farmerResponse.leeks.map((leek) => leek.id));
    }
  }, [farmerResponse.leeks]);

  const handleRemoveFarmerLeek = async (leek: LeekResponse) => {
    if (
      window.confirm(
        `Are you sure you want to remove leek "${leek.name}" from this farmer?`,
      )
    ) {
      try {
        await removeFarmerLeekMutation.mutateAsync({
          farmerId: farmerResponse.id,
          leekId: leek.id,
        });
        setSelectedLeekIds(selectedLeekIds.filter((id) => id !== leek.id));
        setFarmerResponse((prev) => ({
          ...prev,
          leeks: prev.leeks ? prev.leeks.filter((l) => l.id !== leek.id) : [],
        }));
      } catch (err) {
        console.error('Failed to remove leek from farmer:', err);
      }
    }
  };

  const onLeekSelect = async (leekId: string) => {
    console.log('Selected leek ID to add to farmer:', leekId);
    try {
      await addFarmerLeekMutation.mutateAsync({
        farmerId: farmerResponse.id,
        leekId,
      });
      setSelectedLeekIds([...selectedLeekIds, leekId]);
      setFarmerResponse((prev) => ({
        ...prev,
        leeks: prev.leeks
          ? [...prev.leeks, leeksData?.leeks.find((l) => l.id === leekId)!]
          : [],
      }));
    } catch (err) {
      console.error('Failed to add leek to farmer:', err);
    }
  };

  const handleRemoveFarmer = () => {
    if (onRemoveFarmer) {
      onRemoveFarmer(farmerResponse.id);
    }
  };

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Remove',
      onClick: () => handleRemoveFarmerLeek(leek),
      variant: 'danger',
    },
  ];

  const availableLeeks = useMemo(() => {
    if (!leeksData) return [];
    const poolLeekIds = new Set(selectedLeekIds);
    return leeksData.leeks.filter((leek) => !poolLeekIds.has(leek.id));
  }, [leeksData, selectedLeekIds]);

  if (leeksLoading) {
    return <Spinner size="small" label="Loading leeks..." />;
  }

  if (leeksError) {
    return <Result status="error" title="Could not load leeks" />;
  }

  return (
    <div style={styles.container}>
      <h2>{farmerResponse.name}</h2>
      {showRemoveFarmerButton && (
        <Button danger onClick={handleRemoveFarmer}>
          Remove Farmer
        </Button>
      )}
      {showAddLeekButton && (
        <Button onClick={() => setIsAddingLeek(!isAddingLeek)}>
          {isAddingLeek ? 'Cancel' : 'Add Leek'}
        </Button>
      )}
      {isAddingLeek && availableLeeks.length > 0 && (
        <LeekList leeks={availableLeeks} onAddLeek={onLeekSelect} />
      )}
      <LeekList
        leeks={farmerResponse.leeks}
        getDropdownItems={getDropdownItems}
      />
    </div>
  );
}

export default FarmerCard;
