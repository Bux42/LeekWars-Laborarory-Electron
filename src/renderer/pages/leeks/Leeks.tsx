import React from 'react';
import { useNavigate } from 'react-router-dom';
import { leeksStyles as styles } from './Leeks.styles';
import { theme } from '../../theme';
import { useDeleteLeek } from '../../../hooks/leeks/useDeleteLeek';
import LeekList from '../../components/leek/leek-list/LeekList';
import Button from '../../components/shared/button/Button';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';
import { LeekResponse } from '../../../services/leekwarsToolsAPI.schemas';
import { useGetLeeksAll } from '../../../services/leeks/leeks';

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
  const deleteLeekMutation = useDeleteLeek();

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
        await deleteLeekMutation.mutateAsync(leek.id);
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
          Error: Failed to fetch leeks
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
