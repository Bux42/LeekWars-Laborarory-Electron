import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeekscriptAIByHash } from '../../../hooks/leekscript-ai/useLeekscriptAIByHash';
import LeekscriptAI from '../../components/leekscript-ai/LeekscriptAI';
import Spinner from '../../components/shared/spinner/Spinner';
import { aiDetailStyles as styles } from './AIDetail.styles';

const AIDetail: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const navigate = useNavigate();
  const {
    data: ai,
    isLoading,
    error,
  } = useLeekscriptAIByHash(hash || '', true);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <Spinner label="Loading AI record..." />
      </div>
    );
  }

  if (error || !ai) {
    return (
      <div style={styles.container}>
        <div style={styles.backButton} onClick={() => navigate('/ais')}>
          &larr; Back to all AIs
        </div>
        <p style={styles.errorText}>
          {error
            ? `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
            : 'AI not found for this hash.'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backButton} onClick={() => navigate('/ais')}>
        &larr; Back to all AIs
      </div>
      <header style={styles.header}>
        <h1 style={styles.title}>AI Insight</h1>
      </header>
      <LeekscriptAI leekscriptAI={ai} />
    </div>
  );
};

export default AIDetail;
