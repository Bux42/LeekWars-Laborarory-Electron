import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAiId } from '../../../../services/ai/ai';
import LeekscriptAI from '../../../components/leekscript-ai/LeekscriptAI';
import Spinner from '../../../components/shared/spinner/Spinner';
import { aiDetailStyles as styles } from './AIDetail.styles';

function AIDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ai, isLoading, error } = useGetAiId(id || '');

  if (isLoading) {
    return (
      <div style={styles.content}>
        <Spinner label="Loading AI record..." />
      </div>
    );
  }

  if (error || !ai) {
    return (
      <div style={styles.content}>
        <div style={styles.backButton} onClick={() => navigate('/ais')}>
          &larr; Back to all AIs
        </div>
        <p style={styles.errorText}>
          {error ? 'Error: Failed to load AI.' : 'AI not found for this id.'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.content}>
      <div style={styles.backButton} onClick={() => navigate('/ais')}>
        &larr; Back to all AIs
      </div>
      <header style={styles.header}>
        <h1 style={styles.title}>AI Insight</h1>
      </header>
      <LeekscriptAI leekscriptAI={ai} />
    </div>
  );
}

export default AIDetail;
