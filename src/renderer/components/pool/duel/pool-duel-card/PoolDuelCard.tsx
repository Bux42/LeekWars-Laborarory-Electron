import { useState } from 'react';
import { poolDuelCardStyles as styles } from './PoolDuelCard.styles';
import { ILeek } from '../../../../../services/leekwars-laboratory/types/leek/Leek.types';
import LeekList from '../../../leek/leek-list/LeekList';
import LeekPicker from '../../../leek/leek-picker/LeekPicker';
import { IDropdownItem } from '../../../shared/dropdown/Dropdown.types';
import { DuelPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import {
  usePostDuelPoolsIdAddLeek,
  usePostDuelPoolsIdRemoveLeek,
} from '../../../../../services/duel-pools/duel-pools';

interface IPoolDuelCardProps {
  pool: DuelPoolResponse;
}

function PoolDuelCard({ pool: poolProp }: IPoolDuelCardProps) {
  const [pool, setPool] = useState<DuelPoolResponse>(poolProp);

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

  const handleAddLeek = async (leekId: string) => {
    try {
      await addLeekMutation.mutateAsync({
        id: pool.id,
        data: {
          leekId,
        },
      });
      setPool((prevPool) => ({
        ...prevPool,
        leeks: [
          ...prevPool.leeks,
          allLeeks?.leeks.find((leek) => leek.id === leekId)!,
        ],
      }));
    } catch (err) {
      console.error('Failed to add leek to pool:', err);
    }
  };

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
        setPool((prevPool) => ({
          ...prevPool,
          leeks: prevPool.leeks.filter((l) => l.id !== leek.id),
        }));
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
        {(error as any) instanceof Error
          ? (error as any).message
          : 'Unknown error'}
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <LeekPicker
        label="Add Leek to Pool"
        availableLeeks={allLeeks?.leeks || []}
        selectedLeekIds={pool.leeks?.map((leek) => leek.id) || []}
        onLeekSelect={handleAddLeek}
      />

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
