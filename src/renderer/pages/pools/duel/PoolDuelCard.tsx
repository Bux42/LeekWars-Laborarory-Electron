import React, { useMemo } from 'react';
import { IPoolDuel } from '../../../../services/leekwars-laboratory/types/pool/categories/PoolDuel.types';
import { useLeeks } from '../../../../hooks/leeks/useLeeks';
import LeekList from '../../../components/leek-list/LeekList';
import { ILeek } from '../../../../services/leekwars-laboratory/types/leek/Leek.types';
import { IDropdownItem } from '../../../components/shared/dropdown/Dropdown.types';

interface IPoolDuelCardProps {
  pool: IPoolDuel;
}

const PoolDuelCard: React.FC<IPoolDuelCardProps> = ({ pool }) => {
  const { data: allLeeks = [], isLoading, error } = useLeeks();

  const poolLeeks = useMemo(() => {
    return allLeeks.filter((leek) => pool.leekIds.includes(leek.id));
  }, [allLeeks, pool.leekIds]);

  const getDropdownItems = (leek: ILeek): IDropdownItem[] => [
    {
      label: 'Delete',
      onClick: () => {
        console.log('Delete leek from pool:', leek.name);
        // TODO: Implement logic to remove leek from pool
      },
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
