import React, { useEffect, useState } from 'react';
import { poolsStyles as styles } from './Pools.styles';
import { useServerContext } from '../../../context/server/ServerContext';
import { IPoolOneVersusOneResponse } from '../../../services/leekwars-laboratory/pools/PoolOneVersusOne.types';
import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';
import Pool1v1Card from '../../components/pool1v1-card/Pool1v1Card';
import Button from '../../components/shared/button/Button';

function Pools() {
  // const { service } = useServerContext();
  // const [pools1v1, setPools1v1] = useState<IPoolOneVersusOneResponse[]>([]);
  // const [allLeeks, setAllLeeks] = useState<ILeek[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const fetchPools = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const [poolsResponse, leeksResponse] = await Promise.all([
  //       service.getPool1v1List(),
  //       service.getLeeks(),
  //     ]);
  //     setPools1v1(poolsResponse.pools);
  //     setAllLeeks(leeksResponse.leeks);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch pools');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPools();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleCreatePool = async () => {
  //   // eslint-disable-next-line no-alert
  //   const poolName = 'Default Pool';

  //   try {
  //     await service.addPool1v1({
  //       pool: {
  //         name: poolName.trim(),
  //         leek_ids: [],
  //         enabled: false,
  //         fight_count_limit_enabled: true,
  //         fight_count_limit: 10,
  //         total_executed_fights: 0,
  //       },
  //     });
  //     // Refresh the pools list
  //     await fetchPools();
  //   } catch (err) {
  //     // eslint-disable-next-line no-alert
  //     alert(err instanceof Error ? err.message : 'Failed to create pool');
  //   }
  // };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>1v1 Pools</h2>
          {/* <Button onClick={handleCreatePool}>Create</Button> */}
        </div>
        {/* {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {!isLoading && !error && pools1v1.length === 0 && (
          <p style={styles.emptyText}>No pools found.</p>
        )}
        {!isLoading &&
          !error &&
          pools1v1.map((pool) => (
            <Pool1v1Card
              key={pool.id}
              pool={pool}
              availableLeeks={allLeeks}
              onPoolUpdate={fetchPools}
            />
          ))} */}
      </div>
    </div>
  );
}

export default Pools;
