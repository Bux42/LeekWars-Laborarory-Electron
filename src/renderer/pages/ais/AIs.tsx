import React from 'react';
import { useNavigate } from 'react-router-dom';
import { aisStyles as styles } from './AIs.styles';
import Button from '../../components/shared/button/Button';
import LeekscriptAI from '../../components/leekscript-ai/LeekscriptAI';
import Spinner from '../../components/shared/spinner/Spinner';
import { useLeekscriptAIs } from '../../../hooks/leekscript-ai/useLeekscriptAIs';

const AIs: React.FC = () => {
  const navigate = useNavigate();
  const { data: ais = [], isLoading, error } = useLeekscriptAIs(true);

  const handleAddAI = () => {
    navigate('/ais/create');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>All AIs</h1>
        <Button onClick={handleAddAI} variant="primary">
          Add AI
        </Button>
      </header>

      {isLoading ? (
        <div style={styles.loadingText}>
          <Spinner label="Loading AIs..." />
        </div>
      ) : error ? (
        <p style={styles.errorText}>
          Error: {error instanceof Error ? error.message : 'Failed to load AIs'}
        </p>
      ) : ais.length === 0 ? (
        <p style={styles.emptyText}>No leekscript AIs found.</p>
      ) : (
        <div style={styles.list}>
          {ais.map((ai) => (
            <div key={ai.id} style={styles.aiCard}>
              <LeekscriptAI leekscriptAI={ai} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIs;
