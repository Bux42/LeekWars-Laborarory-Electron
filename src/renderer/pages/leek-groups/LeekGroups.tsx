import { Result } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/button/Button';
import { leekGroupsStyles as styles } from './LeekGroups.styles';
import {
  useDeleteLeekGroupsDeleteLeekGroupId,
  useGetLeekGroupsAll,
} from '../../../services/leek-groups/leek-groups';
import LeekGroupList from '../../components/leek-group/leek-group-list/LeekGroupList';
import Spinner from '../../components/shared/spinner/Spinner';
import { LeekGroupResponse } from '../../../services/leekwarsToolsAPI.schemas';

function LeekGroups() {
  const navigate = useNavigate();

  const [leekGroups, setLeekGroups] = useState<LeekGroupResponse[]>([]);

  const { data: leekGroupsData, isLoading, error } = useGetLeekGroupsAll();

  const { mutate: deleteLeekGroupMutation } =
    useDeleteLeekGroupsDeleteLeekGroupId();

  const handleRemoveLeekGroup = async (leekGroupId: string) => {
    try {
      await deleteLeekGroupMutation({ leekGroupId });
      setLeekGroups((prev) => prev.filter((group) => group.id !== leekGroupId));
    } catch (err) {
      console.error('Failed to delete leek group:', err);
    }
  };

  // const handleAddLeekToGroup = (leek) => {

  useEffect(() => {
    if (leekGroupsData?.leekGroups) {
      setLeekGroups(leekGroupsData.leekGroups);
    }
  }, [leekGroupsData?.leekGroups]);

  if (isLoading) {
    return <Spinner size="small" label="Loading leek groups..." />;
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Failed to load leek groups"
        subTitle="An error occurred while fetching leek groups. Please try again later."
      />
    );
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Leek Groups (used in bosses pools)</h1>
        <div style={styles.actions}>
          <Button onClick={() => navigate('/new-leek-group')} variant="primary">
            Add Leek Group
          </Button>
        </div>
      </div>
      {leekGroups?.length === 0 ? (
        <Result
          status="info"
          title="No leek groups found. Click 'Add Leek Group' to create your first leek group!"
        />
      ) : (
        <LeekGroupList
          leekGroups={leekGroups || []}
          onRemoveLeekGroup={handleRemoveLeekGroup}
          showAddLeekButton
        />
      )}
    </>
  );
}

export default LeekGroups;
