import { useEffect, useMemo, useState } from 'react';
import { Button, Result } from 'antd';
import { useGetLeeksAll } from '../../../../services/leeks/leeks';
import {
  LeekGroupResponse,
  LeekResponse,
} from '../../../../services/leekwarsToolsAPI.schemas';
import { ILeekGroupCardProps } from './LeekGroupCard.types';
import { IDropdownItem } from '../../shared/dropdown/Dropdown.types';
import Spinner from '../../shared/spinner/Spinner';
import LeekList from '../../leek/leek-list/LeekList';
import { leekGroupCardStyles as styles } from './LeekGroupCard.styles';
import {
  useDeleteLeekGroupsLeekGroupIdRemoveLeekLeekId,
  usePostLeekGroupsLeekGroupIdAddLeekLeekId,
} from '../../../../services/leek-groups/leek-groups';

function LeekGroupCard({
  leekGroup,
  onRemoveLeekGroup,
  showAddLeekButton,
  showRemoveLeekGroupButton,
  showAddGroupButton,
  onAddLeekGroup,
}: ILeekGroupCardProps) {
  const [leekGroupResponse, setLeekGroupResponse] =
    useState<LeekGroupResponse>(leekGroup);
  const [isAddingLeek, setIsAddingLeek] = useState(false);
  const [selectedLeekIds, setSelectedLeekIds] = useState<string[]>([]);

  const removeLeekGroupLeekMutation =
    useDeleteLeekGroupsLeekGroupIdRemoveLeekLeekId();
  const addLeekGroupLeekMutation = usePostLeekGroupsLeekGroupIdAddLeekLeekId();

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
    if (leekGroupResponse.leeks) {
      setSelectedLeekIds(leekGroupResponse.leeks.map((leek) => leek.id));
    }
  }, [leekGroupResponse.leeks]);

  const handleRemoveLeekFromGroup = async (leek: LeekResponse) => {
    if (
      window.confirm(
        `Are you sure you want to remove leek "${leek.name}" from this leek group?`,
      )
    ) {
      try {
        await removeLeekGroupLeekMutation.mutateAsync({
          leekGroupId: leekGroupResponse.id,
          leekId: leek.id,
        });
        setSelectedLeekIds(selectedLeekIds.filter((id) => id !== leek.id));
        setLeekGroupResponse((prev) => ({
          ...prev,
          leeks: prev.leeks ? prev.leeks.filter((l) => l.id !== leek.id) : [],
        }));
      } catch (err) {
        console.error('Failed to remove leek from leek group:', err);
      }
    }
  };

  const onLeekSelect = async (leekId: string) => {
    try {
      await addLeekGroupLeekMutation.mutateAsync({
        leekGroupId: leekGroupResponse.id,
        leekId,
      });
      setSelectedLeekIds([...selectedLeekIds, leekId]);
      setLeekGroupResponse((prev) => ({
        ...prev,
        leeks: prev.leeks
          ? [...prev.leeks, leeksData?.leeks.find((l) => l.id === leekId)!]
          : [],
      }));
    } catch (err) {
      console.error('Failed to add leek to leek group:', err);
    }
  };

  const handleRemoveLeekGroup = () => {
    if (onRemoveLeekGroup) {
      onRemoveLeekGroup(leekGroupResponse.id);
    }
  };

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Remove',
      onClick: () => handleRemoveLeekFromGroup(leek),
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
      <h2>{leekGroupResponse.name}</h2>
      {showRemoveLeekGroupButton && (
        <Button danger onClick={handleRemoveLeekGroup}>
          Remove Leek Group
        </Button>
      )}
      {showAddGroupButton && (
        <Button
          onClick={() => onAddLeekGroup && onAddLeekGroup(leekGroupResponse.id)}
        >
          Add Leek Group to Pool
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
        leeks={leekGroupResponse.leeks}
        getDropdownItems={getDropdownItems}
      />
    </div>
  );
}

export default LeekGroupCard;
