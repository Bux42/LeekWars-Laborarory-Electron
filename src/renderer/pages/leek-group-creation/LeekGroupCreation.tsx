import { useMemo, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetLeeksAll } from '../../../services/leeks/leeks';
import { LeekResponse } from '../../../services/leekwarsToolsAPI.schemas';
import Spinner from '../../components/shared/spinner/Spinner';
import Input from '../../components/shared/input/Input';
import { leekGroupCreationStyles as styles } from './LeekGroupCreation.styles';
import LeekList from '../../components/leek/leek-list/LeekList';
import { usePostLeekGroupsAdd } from '../../../services/leek-groups/leek-groups';

function LeekGroupCreation() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState('');
  const [selectedLeeks, setSelectedLeeks] = useState<LeekResponse[]>([]);

  const postLeekGroupAddMutation = usePostLeekGroupsAdd();

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

  const availableLeeks = useMemo(() => {
    if (!allLeeks) return [];
    const poolLeekIds = new Set(selectedLeeks.map((leek) => leek.id));
    return allLeeks.leeks.filter((leek) => !poolLeekIds.has(leek.id));
  }, [allLeeks, selectedLeeks]);

  const validGroup = groupName.trim() !== '' && selectedLeeks.length > 0;

  const handleSubmit = async () => {
    if (!validGroup) return;

    try {
      await postLeekGroupAddMutation.mutateAsync({
        data: {
          name: groupName,
          leekIds: selectedLeeks.map((leek) => leek.id),
        },
      });
      navigate('/leek-groups');
    } catch (err) {
      console.error('Failed to create leek group:', err);
      alert('Failed to create leek group. Please try again.');
    }
  };

  if (isLoading) {
    return <Spinner size="small" label="Loading leeks..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading leeks" />;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Leek Group Creation</h1>
      </div>
      <Input
        placeholder="Enter group name"
        value={groupName}
        onChange={(value) => setGroupName(value)}
      />
      <div style={styles.section}>
        <h3>Selected leeks ({selectedLeeks.length})</h3>
        <LeekList leeks={selectedLeeks} onRemoveLeek={onRemoveLeek} />
        <h3>Available leeks ({availableLeeks.length})</h3>
        <LeekList leeks={availableLeeks} onAddLeek={onLeekSelect} />
        <Button onClick={handleSubmit} disabled={!validGroup}>
          Create Group
        </Button>
      </div>
    </>
  );
}

export default LeekGroupCreation;
