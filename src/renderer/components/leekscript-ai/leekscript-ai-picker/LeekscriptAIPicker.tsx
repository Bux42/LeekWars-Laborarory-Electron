import React from 'react';
import { useGetAiList } from '../../../../services/ai/ai';
import { leekscriptAIPickerStyles as styles } from './LeekscriptAIPicker.styles';
import { ILeekscriptAIPickerProps } from './LeekscriptAIPicker.types';
import Spinner from '../../shared/spinner/Spinner';

function LeekscriptAIPicker({
  selectedAiId,
  onSelect,
}: ILeekscriptAIPickerProps) {
  const { data, isLoading, error } = useGetAiList();
  const ais = data?.ais ?? [];

  if (isLoading) {
    return <Spinner size="small" label="Loading AIs..." />;
  }

  if (error) {
    return <div style={styles.error}>Error loading AIs</div>;
  }

  return (
    <div style={styles.container}>
      <select
        style={styles.select}
        value={selectedAiId}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled style={styles.option}>
          Select a LeekScript AI
        </option>
        {ais
          .filter((ai) => !!ai.id)
          .map((ai) => (
            <option key={ai.id} value={ai.id} style={styles.option}>
              {ai.name} ({ai.id?.substring(0, 8)})
            </option>
          ))}
      </select>
    </div>
  );
}

export default LeekscriptAIPicker;
