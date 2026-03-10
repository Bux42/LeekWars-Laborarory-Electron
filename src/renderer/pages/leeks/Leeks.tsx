import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { leeksStyles as styles } from './Leeks.styles';
import LeekList from '../../components/leek/leek-list/LeekList';
import Button from '../../components/shared/button/Button';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';
import { LeekResponse } from '../../../services/leekwarsToolsAPI.schemas';
import {
  useDeleteLeeksDeleteLeekId,
  useGetLeeksAll,
} from '../../../services/leeks/leeks';
import Spinner from '../../components/shared/spinner/Spinner';

function Leeks() {
  const navigate = useNavigate();
  const {
    data,
    isLoading: loading,
    error,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const leeks = data?.leeks ?? [];
  const deleteLeekMutation = useDeleteLeeksDeleteLeekId();

  const handleEdit = (leek: LeekResponse) => {
    console.log('Edit leek:', leek.name);
    // TODO: Implement edit logic
  };

  const handleDuplicate = (leek: LeekResponse) => {
    console.log('Duplicate leek:', leek.name);
    // TODO: Implement duplicate logic
  };

  const handleDelete = async (leek: LeekResponse) => {
    if (!leek.id) {
      return;
    }

    if (
      window.confirm(`Are you sure you want to delete leek "${leek.name}"?`)
    ) {
      try {
        await deleteLeekMutation.mutateAsync({ leekId: leek.id });
      } catch (err) {
        console.error('Failed to delete leek:', err);
      }
    }
  };

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Edit',
      onClick: () => handleEdit(leek),
    },
    {
      label: 'Duplicate',
      onClick: () => handleDuplicate(leek),
    },
    {
      label: 'Delete',
      onClick: () => handleDelete(leek),
      variant: 'danger',
    },
  ];

  if (loading) {
    return <Spinner size="small" label="Loading leeks..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading leeks" />;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Leeks</h1>
        <div style={styles.actions}>
          <Button onClick={() => navigate('/new-leek')} variant="primary">
            Add Leek
          </Button>
          <Button
            onClick={() => navigate('/bulk-import-leeks')}
            variant="primary"
          >
            Add Leeks Bulk
          </Button>
        </div>
      </div>
      {leeks.length === 0 ? (
        <Result
          status="info"
          title="No leeks found. Click 'Add Leek' to create your first leek!"
        />
      ) : (
        <LeekList leeks={leeks} getDropdownItems={getDropdownItems} />
      )}
    </>
  );
}

export default Leeks;
