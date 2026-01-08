import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leeksStyles as styles } from './Leeks.styles';
import { theme } from '../../theme';
import { useServerContext } from '../../../context/server/ServerContext';
import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';
import LeekList from '../../components/leek-list/LeekList';
import Button from '../../components/shared/button/Button';

function Leeks() {
  const navigate = useNavigate();
  const { port, service } = useServerContext();
  const [leeks, setLeeks] = useState<ILeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeeks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await service.getLeeks();
        setLeeks(response.leeks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leeks');
      } finally {
        setLoading(false);
      }
    };

    fetchLeeks();
  }, [port, service]);

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
        <p style={{ color: theme.colors.accent.error }}>Error: {error}</p>
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
