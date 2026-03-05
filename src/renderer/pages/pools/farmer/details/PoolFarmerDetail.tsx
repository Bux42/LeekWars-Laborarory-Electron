import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteFarmerPoolsIdRemoveFarmerFarmerId,
  useGetFarmerPoolsId,
  usePostFarmerPoolsIdAddFarmer,
} from '../../../../../services/farmer-pools/farmer-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import Button from '../../../../components/shared/button/Button';
import { usePoolFarmerId } from '../../../../../hooks/pools/farmer/usePoolFarmerId';
import { useGetFarmersAll } from '../../../../../services/farmers/farmers';
import FarmerPicker from '../../../../components/farmer/farmer-picker/FarmerPicker';
import FarmerList from '../../../../components/farmer/farmer-list/FarmerList';
import {
  useGetFarmerPoolRunGetByPoolIdId,
  usePostFarmerPoolRunIdStart,
} from '../../../../../services/farmer-pool-runs/farmer-pool-runs';
import { FarmerPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';

function PoolFarmerDetail() {
  const navigate = useNavigate();
  const poolId = usePoolFarmerId();

  const {
    data: pool,
    isLoading: isLoadingPool,
    error: poolError,
  } = useGetFarmerPoolsId(poolId);

  const [farmerPool, setFarmerPool] = useState<FarmerPoolResponse | null>(pool);
  const [isAddingFarmer, setIsAddingFarmer] = useState<boolean>(isLoadingPool);
  const [farmerPoolError, setFarmerPoolError] = useState<void | null>(
    poolError,
  );

  const {
    data: runsData,
    isLoading: runsLoading,
    error: runsError,
  } = useGetFarmerPoolRunGetByPoolIdId(poolId || '');

  const {
    data: farmers,
    isLoading: isLoadingFarmers,
    error: farmersError,
  } = useGetFarmersAll();

  const [selectedFarmersIds, setSelectedFarmersIds] = useState<string[]>([]);

  useEffect(() => {
    if (pool) {
      setFarmerPool(pool);
      setSelectedFarmersIds(pool.farmers.map((farmer) => farmer.id));
    }
  }, [pool]);

  const { mutate: addFarmerToPool } = usePostFarmerPoolsIdAddFarmer();
  const { mutate: removeFarmerFromPool } =
    useDeleteFarmerPoolsIdRemoveFarmerFarmerId(); // You would need to implement the actual remove mutation

  const startMutation = usePostFarmerPoolRunIdStart();

  const handleStartPool = async () => {
    try {
      const result = await startMutation.mutateAsync({ id: poolId });
      if (result.id) {
        navigate(`/pools/farmer/${poolId}/runs/${result.id}`);
      }
    } catch (err) {
      console.error('Failed to start pool duel:', err);
    }
  };

  if (isLoadingPool || isLoadingFarmers) {
    return <p>Loading pool details...</p>;
  }

  if (poolError || farmersError || !pool || !pool.basePool) {
    return (
      <p style={{ color: 'red' }}>
        {poolError || farmersError
          ? 'Error: Failed to fetch pool details'
          : 'Pool not found'}
      </p>
    );
  }

  const onAddFarmerToPool = (farmerId: string) => {
    if (selectedFarmersIds.includes(farmerId)) {
      // Farmer is already selected, you can implement remove logic here if needed
      return;
    }
    try {
      addFarmerToPool({
        data: {
          farmerId,
        },
        id: pool.id,
      });

      setSelectedFarmersIds((prev) => [...prev, farmerId]);
      setFarmerPool((prev) => {
        if (!prev) return prev;
        const newFarmer = farmers?.farmers.find((f) => f.id === farmerId);
        if (!newFarmer) return prev;
        return {
          ...prev,
          farmers: [...prev.farmers, newFarmer],
        };
      });
    } catch (err) {
      console.error('Failed to add farmer to pool:', err);
    }
  };

  const onRemoveFarmer = (farmerId: string) => {
    try {
      removeFarmerFromPool({
        id: pool.id,
        farmerId,
      });

      setSelectedFarmersIds((prev) => prev.filter((id) => id !== farmerId));
      setFarmerPool((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          farmers: prev.farmers.filter((f) => f.id !== farmerId),
        };
      });
    } catch (err) {
      console.error('Failed to remove farmer from pool:', err);
    }
  };

  console.log('farmers.farmers', farmers?.farmers);

  return (
    <BasePoolWrapper
      pool={pool.basePool}
      onStart={handleStartPool}
      totalCombinations={farmers?.farmers.length || 0}
    >
      {runsData?.runs?.length > 0 && (
        <>
          <Button onClick={() => navigate(`/pools/farmer/${poolId}/runs`)}>
            View {runsData?.runs?.length} Runs
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/pools/farmer/${poolId}/runs/${runsData?.runs?.[0]?.id}`,
              )
            }
          >
            View last run
          </Button>
        </>
      )}
      {farmers?.farmers.length && (
        <FarmerPicker
          label="Add farmer to pool"
          availableFarmers={farmers.farmers || []}
          selectedFarmerIds={selectedFarmersIds}
          onFarmerSelect={onAddFarmerToPool}
        />
      )}
      {farmerPool && (
        <FarmerList
          farmers={farmerPool.farmers}
          showAddLeekButton={false}
          showRemoveFarmerButton
          onRemoveFarmer={onRemoveFarmer}
        />
      )}
    </BasePoolWrapper>
  );
}

export default PoolFarmerDetail;
