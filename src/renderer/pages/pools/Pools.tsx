import React, { useEffect, useState } from 'react';
import { poolsStyles as styles } from './Pools.styles';
import { useServerContext } from '../../../context/server/ServerContext';
import { IPoolOneVersusOne } from '../../../services/leekwars-laboratory/pools/PoolOneVersusOne.types';
import Pool1v1Card from '../../components/pool1v1-card/Pool1v1Card';

function Pools() {
  const { service } = useServerContext();
  const [pools1v1, setPools1v1] = useState<IPoolOneVersusOne[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await service.getPool1v1List();
        setPools1v1(response.pools);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pools');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPools();
  }, [service]);

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1v1 Pools</h2>
        {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {!isLoading && !error && pools1v1.length === 0 && (
          <p style={styles.emptyText}>No pools found.</p>
        )}
        {!isLoading &&
          !error &&
          pools1v1.map((pool) => <Pool1v1Card key={pool.id} pool={pool} />)}
      </div>
    </div>
  );
}

export default Pools;
