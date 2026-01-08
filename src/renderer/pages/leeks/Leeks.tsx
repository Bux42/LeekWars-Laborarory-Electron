import React from 'react';
import { useNavigate } from 'react-router-dom';
import { leeksStyles as styles } from './Leeks.styles';
import { theme } from '../../theme';
import { useLeeks } from '../../../hooks/leeks/useLeeks';
import { useDeleteLeek } from '../../../hooks/leeks/useDeleteLeek';
import LeekList from '../../components/leek-list/LeekList';
import Button from '../../components/shared/button/Button';
import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';

function Leeks() {
  const navigate = useNavigate();
  const { data: leeks = [], isLoading: loading, error } = useLeeks();
  const deleteLeekMutation = useDeleteLeek();

  const handleEdit = (leek: ILeek) => {
    console.log('Edit leek:', leek.name);
    // TODO: Implement edit logic
  };

  const handleDuplicate = (leek: ILeek) => {
    console.log('Duplicate leek:', leek.name);
    // TODO: Implement duplicate logic
  };

  const handleDelete = async (leek: ILeek) => {
    if (
      window.confirm(`Are you sure you want to delete leek "${leek.name}"?`)
    ) {
      try {
        await deleteLeekMutation.mutateAsync(leek.id);
      } catch (err) {
        console.error('Failed to delete leek:', err);
      }
    }
  };

  const getDropdownItems = (leek: ILeek): IDropdownItem[] => [
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
    return (
      <div style={styles.container}>
        <h1>Leeks</h1>
        <p>Loading leeks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1>Leeks</h1>
        <p style={{ color: theme.colors.accent.error }}>
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to fetch leeks'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Leeks</h1>
        <Button onClick={() => navigate('/new-leek')} variant="primary">
          Add Leek
        </Button>
      </div>
      <LeekList leeks={leeks} getDropdownItems={getDropdownItems} />
    </div>
  );
}

export default Leeks;
