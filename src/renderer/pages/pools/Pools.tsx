import React from 'react';
import { poolsStyles as styles } from './Pools.styles';

function Pools() {
  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Pools Dashboard</h2>
        </div>
        <p style={styles.emptyText}>
          Select a pool category from the navigation menu to view details.
        </p>
      </div>
    </div>
  );
}

export default Pools;
