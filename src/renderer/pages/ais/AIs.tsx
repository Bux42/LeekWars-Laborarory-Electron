import React from 'react';
import { aisStyles as styles } from './AIs.styles';
import Button from '../../components/shared/button/Button';

const AIs: React.FC = () => {
  const handleAddAI = () => {
    console.log('adding ai');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>AIs</h1>
        <Button onClick={handleAddAI} variant="primary">
          Add AI
        </Button>
      </header>
      <div>
        <p>Manage your LeekScript AIs here.</p>
      </div>
    </div>
  );
};

export default AIs;
