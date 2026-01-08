import React from 'react';
import { poolsStyles as styles } from './Pools.styles';
import { usePoolDuels } from '../../../hooks/pools/usePoolDuels';
import BasePoolWrapper from '../../components/pool/BasePoolWrapper';
import Button from '../../components/shared/button/Button';

function Pools() {
  const { data: pools = [], isLoading, error } = usePoolDuels();

  const handleSetEnabled = (value: boolean) => {
    console.log(value);
  };

  const handleSetResetElo = (value: boolean) => {
    console.log(value);
  };

  const handleSetDeterministic = (value: boolean) => {
    console.log(value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Duel Pools</h2>
          {/* <Button onClick={handleCreatePool}>Create</Button> will implement later */}
        </div>

        {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
        {error && (
          <p style={styles.errorText}>
            Error:{' '}
            {error instanceof Error ? error.message : 'Failed to fetch pools'}
          </p>
        )}
        {!isLoading && !error && pools.length === 0 && (
          <p style={styles.emptyText}>No pools found.</p>
        )}

        {pools.map((pool) => (
          <BasePoolWrapper
            key={pool.id}
            pool={pool}
            onSetEnabled={handleSetEnabled}
            onSetResetElo={handleSetResetElo}
            onSetDeterministic={handleSetDeterministic}
          />
        ))}
      </div>
    </div>
  );
}

export default Pools;
