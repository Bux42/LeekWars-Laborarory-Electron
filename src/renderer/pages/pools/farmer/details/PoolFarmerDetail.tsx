import { useEffect, useState } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteFarmerPoolsIdRemoveFarmerFarmerId,
  useGetFarmerPoolsId,
  useGetFarmerPoolsIdRunsInfo,
  usePostFarmerPoolsIdAddFarmer,
} from '../../../../../services/farmer-pools/farmer-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import { usePoolFarmerId } from '../../../../../hooks/pools/farmer/usePoolFarmerId';
import { useGetFarmersAll } from '../../../../../services/farmers/farmers';
import FarmerPicker from '../../../../components/farmer/farmer-picker/FarmerPicker';
import FarmerList from '../../../../components/farmer/farmer-list/FarmerList';
import { usePostFarmerPoolRunIdStart } from '../../../../../services/farmer-pool-runs/farmer-pool-runs';
import { FarmerPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import LastPoolRunsButttons from '../../../../components/pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';
import Spinner from '../../../../components/shared/spinner/Spinner';

function PoolFarmerDetail() {
  const navigate = useNavigate();
  const poolId = usePoolFarmerId();

  const {
    data: pool,
    isLoading: isLoadingPool,
    error: poolError,
  } = useGetFarmerPoolsId(poolId);

  const [farmerPool, setFarmerPool] = useState<FarmerPoolResponse | null>(pool);

  const {
    data: runsInfo,
    isLoading: runsInfoLoading,
    error: runsInfoError,
  } = useGetFarmerPoolsIdRunsInfo(poolId || '');

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

  if (isLoadingPool || isLoadingFarmers || runsInfoLoading) {
    return <Spinner label="Loading pool details..." />;
  }

  if (poolError || farmersError || runsInfoError || !pool || !pool.basePool) {
    return <Result status="error" title="Error loading pool details" />;
  }

  return (
    <BasePoolWrapper
      pool={pool.basePool}
      onStart={handleStartPool}
      totalCombinations={selectedFarmersIds.length || 0}
    >
      {runsInfo && (
        <LastPoolRunsButttons
          poolRunsInfo={runsInfo}
          poolType="farmer"
          poolId={pool.id}
        />
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
