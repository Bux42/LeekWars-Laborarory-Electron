import React, { useMemo } from 'react';
import { IPoolDuel } from '../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import { useLeeks } from '../../../../hooks/leeks/useLeeks';
import LeekList from '../../../components/leek-list/LeekList';
import { ILeek } from '../../../../services/leekwars-laboratory/types/leek/Leek.types';
import { IDropdownItem } from '../../../components/shared/dropdown/Dropdown.types';
import { useRemoveLeekFromPool } from '../../../../hooks/pools/useRemoveLeekFromPool';

interface IPoolDuelCardProps {
  pool: IPoolDuel;
}

const PoolDuelCard: React.FC<IPoolDuelCardProps> = ({ pool }) => {
  const { data: allLeeks = [], isLoading, error } = useLeeks();
  const removeLeekMutation = useRemoveLeekFromPool();

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
    return (
      <p style={{ color: '#9d9d9d', fontStyle: 'italic' }}>
        Loading pool leeks...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ color: '#f44336' }}>
        Error loading leeks:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    );
  }

  return (
    <div>
      <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#cccccc' }}>
        Leeks in Pool ({poolLeeks.length})
      </h3>
      {poolLeeks.length > 0 ? (
        <LeekList leeks={poolLeeks} getDropdownItems={getDropdownItems} />
      ) : (
        <p style={{ color: '#9d9d9d', fontStyle: 'italic' }}>
          No leeks in this pool.
        </p>
      )}
    </div>
  );
};

export default PoolDuelCard;
