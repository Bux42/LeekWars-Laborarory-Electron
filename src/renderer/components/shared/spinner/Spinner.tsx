import React from 'react';
import { ISpinnerProps } from './Spinner.types';
import { spinnerStyles as styles } from './Spinner.styles';

const Spinner: React.FC<ISpinnerProps> = ({
  size = 'medium',
  color,
  label,
}) => {
  return (
    <div style={styles.container}>
      {/* Inject keyframes locally if they don't exist */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.spinner(size, color)} />
      {label && <span style={styles.label}>{label}</span>}
    </div>
  );
};

export default Spinner;
