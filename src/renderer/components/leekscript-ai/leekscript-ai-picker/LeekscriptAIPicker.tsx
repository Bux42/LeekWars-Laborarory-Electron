import React from 'react';
import { useLeekscriptAIs } from '../../../../hooks/leekscript-ai/useLeekscriptAIs';
import { leekscriptAIPickerStyles as styles } from './LeekscriptAIPicker.styles';
import Spinner from '../../shared/spinner/Spinner';

interface ILeekscriptAIPickerProps {
  selectedHash?: string;
  onSelect: (hash: string) => void;
}

const LeekscriptAIPicker: React.FC<ILeekscriptAIPickerProps> = ({
  selectedHash,
  onSelect,
}) => {
  const { data: ais, isLoading, error } = useLeekscriptAIs(true);

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
        value={selectedHash || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled style={styles.option}>
          Select a LeekScript AI
        </option>
        {ais?.map((ai) => (
          <option
            key={ai.mergedCode.hash}
            value={ai.mergedCode.hash}
            style={styles.option}
          >
            {ai.name} ({ai.mergedCode.hash.substring(0, 8)})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeekscriptAIPicker;
