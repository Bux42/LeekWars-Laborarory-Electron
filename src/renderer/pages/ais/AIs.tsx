import React from 'react';
import { useNavigate } from 'react-router-dom';
import { aisStyles as styles } from './AIs.styles';
import Button from '../../components/shared/button/Button';
import LeekscriptAI from '../../components/leekscript-ai/LeekscriptAI';
import Spinner from '../../components/shared/spinner/Spinner';
import { useGetAiList } from '../../../services/ai/ai';

function AIs() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAiList();

  const ais = data?.ais ?? [];

  const handleAddAI = () => {
    navigate('/ais/create');
  };

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div style={styles.loadingText}>
        <Spinner label="Loading AIs..." />
      </div>
    );
  } else if (error) {
    content = (
      <p style={styles.errorText}>
        Error: {error instanceof Error ? error.message : 'Failed to load AIs'}
      </p>
    );
  } else if (ais.length === 0) {
    content = <p style={styles.emptyText}>No AIs found.</p>;
  } else {
    content = (
      <div style={styles.list}>
        {ais.map((ai) => (
          <div key={ai.id ?? ai.name} style={styles.aiCard}>
            <LeekscriptAI leekscriptAI={ai} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.title}>All AIs</h1>
        <Button onClick={handleAddAI} variant="primary">
          Add AI
        </Button>
      </header>

      {content}
    </>
  );
}

export default AIs;
