import { useEffect, useState } from 'react';
import { Button } from 'antd';
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
import LeekPicker from '../../leek/leek-picker/LeekPicker';
import { useGetLeeksAll } from '../../../../services/leeks/leeks';
import { IFarmerCardProps } from './FarmerCard.types';

function FarmerCard({ farmer }: IFarmerCardProps) {
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

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Remove',
      onClick: () => handleRemoveFarmerLeek(leek),
      variant: 'danger',
    },
  ];

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

  console.log('farmer response', farmerResponse);

  return (
    <div style={styles.container}>
      <h2>{farmerResponse.name}</h2>
      <Button onClick={() => setIsAddingLeek(!isAddingLeek)}>
        {isAddingLeek ? 'Cancel' : 'Add Leek'}
      </Button>
      {isAddingLeek && leeksData?.leeks && (
        <LeekPicker
          availableLeeks={leeksData?.leeks}
          label="Add leek"
          onLeekSelect={onLeekSelect}
          selectedLeekIds={selectedLeekIds}
        />
      )}
      <LeekList
        leeks={farmerResponse.leeks}
        getDropdownItems={getDropdownItems}
      />
    </div>
  );
}

export default FarmerCard;
