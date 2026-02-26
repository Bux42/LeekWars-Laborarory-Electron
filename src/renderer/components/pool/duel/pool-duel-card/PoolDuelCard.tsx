import React, { useMemo } from 'react';
import { poolDuelCardStyles as styles } from './PoolDuelCard.styles';
import { useNavigate } from 'react-router-dom';
import { useLeeks } from '../../../../../hooks/leeks/useLeeks';
import { useRemoveLeekFromPool } from '../../../../../hooks/pools/duel/useRemoveLeekFromPool';
import { usePoolRunDuelsByPoolId } from '../../../../../hooks/pool-runs/duel/usePoolRunDuelsByPoolId';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';
import { useAddLeekToPool } from '../../../../../hooks/pools/duel/useAddLeekToPool';
import { ILeek } from '../../../../../services/leekwars-laboratory/types/leek/Leek.types';
import { IPoolDuel } from '../../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import LeekList from '../../../leek/leek-list/LeekList';
import LeekPicker from '../../../leek/leek-picker/LeekPicker';
import { IDropdownItem } from '../../../shared/dropdown/Dropdown.types';
import Button from '../../../shared/button/Button';
import Spinner from '../../../shared/spinner/Spinner';
import { DuelPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import {
  usePostDuelPoolsIdAddLeek,
  usePostDuelPoolsIdRemoveLeek,
} from '../../../../../services/duel-pools/duel-pools';

interface IPoolDuelCardProps {
  pool: DuelPoolResponse;
}

function PoolDuelCard({ pool }: IPoolDuelCardProps) {
  const navigate = useNavigate();
  // const { data: allLeeks = [], isLoading, error } = useLeeks();

  const {
    data: allLeeks,
    isLoading,
    error,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const addLeekMutation = usePostDuelPoolsIdAddLeek();
  const removeLeekMutation = usePostDuelPoolsIdRemoveLeek();

  // First we fetch to see if any run is active
  // const initialQuery = usePoolRunDuelsByPoolId(pool.id);

  // If at least one run is active, we poll
  // const hasActiveRuns = initialQuery.data?.some((run) => run.running) ?? false;
  // const { data: runs = [] } = usePoolRunDuelsByPoolId(
  //   pool.id,
  //   hasActiveRuns ? 1000 : undefined,
  // );
  // const removeLeekMutation = useRemoveLeekFromPool();
  // const addLeekMutation = useAddLeekToPool();

  const handleAddLeek = async (leekId: string) => {
    try {
      await addLeekMutation.mutateAsync({
        id: pool.id,
        data: {
          leekId,
        },
      });
    } catch (err) {
      console.error('Failed to add leek to pool:', err);
    }
  };

  const { totalScenarios, totalFights } = usePoolFightEstimation(
    pool.leeks.length,
    pool.basePool?.fightLimit,
  );

  // const activeRunsCount = useMemo(
  //   () => runs.filter((run) => run.running).length,
  //   [runs],
  // );

  // const lastRun = useMemo(() => {
  //   if (runs.length === 0) return null;
  //   return [...runs].sort((a, b) => b.startTime - a.startTime)[0];
  // }, [runs]);

  // const poolLeeks = useMemo(() => {
  //   return allLeeks.filter((leek) => pool.leeks.includes(leek.id));
  // }, [allLeeks, pool.leeks]);

  const handleRemoveLeek = async (leek: ILeek) => {
    if (
      window.confirm(
        `Are you sure you want to remove leek "${leek.name}" from this pool?`,
      )
    ) {
      try {
        await removeLeekMutation.mutateAsync({
          id: pool.id,
          data: {
            leekId: leek.id,
          },
        });
      } catch (err) {
        console.error('Failed to remove leek from pool:', err);
      }
    }
  };

  const getDropdownItems = (leek: ILeek): IDropdownItem[] => [
    {
      label: 'Remove from pool',
      onClick: () => handleRemoveLeek(leek),
      variant: 'danger',
    },
  ];

  if (isLoading) {
    return <p style={styles.loadingText}>Loading pool leeks...</p>;
  }

  if (error) {
    return (
      <p style={styles.errorText}>
        Error loading leeks:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.statsContainer}>
        Total estimated fights: {totalFights} ({totalScenarios} duel
        combinations x {pool.basePool.fightLimit || 1} fights)
      </div>
      <LeekPicker
        label="Add Leek to Pool"
        availableLeeks={allLeeks?.leeks || []}
        selectedLeekIds={pool.leeks?.map((leek) => leek.id) || []}
        onLeekSelect={handleAddLeek}
      />
      {/* {runs.length > 0 && (
        <div style={styles.runsSummary}>
          <div style={styles.runsInfo}>
            <span style={styles.details}>
              Runs for this pool: <strong>{runs.length}</strong>
            </span>
            {activeRunsCount > 0 && (
              <Spinner
                size="small"
                label={`${activeRunsCount} active`}
                direction="row"
              />
            )}
          </div>
          <div style={styles.runsActions}>
            {lastRun && (
              <Button
                onClick={() => {
                  navigate(`/pools/duel/${pool.id}/runs/${lastRun.id}`);
                }}
                variant="primary"
              >
                View last run
              </Button>
            )}
            <Button
              onClick={() => navigate(`/pools/duel/${pool.id}/runs`)}
              variant="secondary"
            >
              View all runs
            </Button>
          </div>
        </div>
      )} */}

      <h3 style={styles.title}>Leeks in Pool ({pool.leeks.length})</h3>
      {pool.leeks.length > 0 ? (
        <LeekList leeks={pool.leeks} getDropdownItems={getDropdownItems} />
      ) : (
        <p style={styles.emptyText}>No leeks in this pool.</p>
      )}
    </div>
  );
}

export default PoolDuelCard;
