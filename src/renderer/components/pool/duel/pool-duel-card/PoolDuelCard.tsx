import React, { useMemo } from 'react';
import { poolDuelCardStyles as styles } from './PoolDuelCard.styles';
import { useNavigate } from 'react-router-dom';
import { useLeeks } from '../../../../../hooks/leeks/useLeeks';
import { useRemoveLeekFromPool } from '../../../../../hooks/pools/duel/useRemoveLeekFromPool';
import { usePoolRunDuelsByPoolId } from '../../../../../hooks/pool-runs/duel/usePoolRunDuelsByPoolId';
import { ILeek } from '../../../../../services/leekwars-laboratory/types/leek/Leek.types';
import { IPoolDuel } from '../../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import LeekList from '../../../leek/leek-list/LeekList';
import { IDropdownItem } from '../../../shared/dropdown/Dropdown.types';
import Button from '../../../shared/button/Button';
import Spinner from '../../../shared/spinner/Spinner';

interface IPoolDuelCardProps {
  pool: IPoolDuel;
}

const PoolDuelCard: React.FC<IPoolDuelCardProps> = ({ pool }) => {
  const navigate = useNavigate();
  const { data: allLeeks = [], isLoading, error } = useLeeks();

  // First we fetch to see if any run is active
  const initialQuery = usePoolRunDuelsByPoolId(pool.id);

  // If at least one run is active, we poll
  const hasActiveRuns = initialQuery.data?.some((run) => run.running) ?? false;
  const { data: runs = [] } = usePoolRunDuelsByPoolId(
    pool.id,
    hasActiveRuns ? 1000 : undefined,
  );
  const removeLeekMutation = useRemoveLeekFromPool();

  const activeRunsCount = useMemo(
    () => runs.filter((run) => run.running).length,
    [runs],
  );

  const poolLeeks = useMemo(() => {
    return allLeeks.filter((leek) => pool.leekIds.includes(leek.id));
  }, [allLeeks, pool.leekIds]);

  const handleRemoveLeek = async (leek: ILeek) => {
    if (
      window.confirm(
        `Are you sure you want to remove leek "${leek.name}" from this pool?`,
      )
    ) {
      try {
        await removeLeekMutation.mutateAsync({
          poolId: pool.id,
          leekId: leek.id,
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

  const totalScenarios = pool.leekIds.length * (pool.leekIds.length - 1);
  const totalFights = totalScenarios * (pool.fightLimit || 1);

  return (
    <div style={styles.container}>
      <div style={styles.statsContainer}>
        Total estimated fights: {totalFights} ({totalScenarios} duel
        combinations x {pool.fightLimit || 1} fights)
      </div>

      {runs.length > 0 && (
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
          <Button
            onClick={() => navigate(`/pools/duels/${pool.id}/runs`)}
            variant="primary"
          >
            View runs
          </Button>
        </div>
      )}

      <h3 style={styles.title}>Leeks in Pool ({poolLeeks.length})</h3>
      {poolLeeks.length > 0 ? (
        <LeekList leeks={poolLeeks} getDropdownItems={getDropdownItems} />
      ) : (
        <p style={styles.emptyText}>No leeks in this pool.</p>
      )}
    </div>
  );
};

export default PoolDuelCard;
