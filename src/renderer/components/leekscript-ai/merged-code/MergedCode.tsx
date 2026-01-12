import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMergedCodeProps } from './MergedCode.types';
import { mergedCodeStyles as styles } from './MergedCode.styles';

const MergedCode: React.FC<IMergedCodeProps> = ({ mergedCode }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.title}>Merged LeekScript Code</div>
      <div style={styles.hashContainer}>
        <span style={styles.label}>Code Hash:</span>
        <span
          style={styles.hash}
          onClick={() => navigate(`/ais/${mergedCode.hash}`)}
        >
          {mergedCode.hash}
        </span>
      </div>
      <div style={styles.codeContainer}>
        <pre style={styles.code}>{mergedCode.code}</pre>
      </div>
    </div>
  );
};

export default MergedCode;
