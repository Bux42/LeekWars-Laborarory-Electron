import React from 'react';
import { IProgressBarProps } from './ProgressBar.types';
import { progressBarStyles as styles } from './ProgressBar.styles';

const ProgressBar: React.FC<IProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color,
  height = 8,
}) => {
  const percentage = (value / max) * 100;

  return (
    <div style={styles.container}>
      {(label || showValue) && (
        <div style={styles.header}>
          {label && <span>{label}</span>}
          {showValue && (
            <span>
              {Math.round(percentage)}% ({value}/{max})
            </span>
          )}
        </div>
      )}
      <div style={styles.barContainer(height)}>
        <div style={styles.fill(percentage, color)} />
      </div>
    </div>
  );
};

export default ProgressBar;
