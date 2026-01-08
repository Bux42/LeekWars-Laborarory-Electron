import React from 'react';
import { useNavigate } from 'react-router-dom';
import { leeksStyles as styles } from './Leeks.styles';
import { theme } from '../../theme';
import { useLeeks } from '../../../hooks/leeks/useLeeks';
import LeekList from '../../components/leek-list/LeekList';
import Button from '../../components/shared/button/Button';

function Leeks() {
  const navigate = useNavigate();
  const { data: leeks = [], isLoading: loading, error } = useLeeks();

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
      <LeekList leeks={leeks} />
    </div>
  );
}

export default Leeks;
