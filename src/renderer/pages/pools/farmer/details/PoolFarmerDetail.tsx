import { useNavigate } from 'react-router-dom';
import {
  useGetFarmerPoolsId,
  usePostFarmerPoolsIdAddFarmer,
} from '../../../../../services/farmer-pools/farmer-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import Button from '../../../../components/shared/button/Button';
import { usePoolFarmerId } from '../../../../../hooks/pools/farmer/usePoolFarmerId';
import PoolFarmerCard from '../../../../components/pool/farmer/pool-farmer-card/PoolFarmerCard';
import {
  useGetFarmersAll,
  usePostFarmersFarmerIdAddLeekLeekId,
} from '../../../../../services/farmers/farmers';
import FarmerPicker from '../../../../components/farmer/farmer-picker/FarmerPicker';
import FarmerList from '../../../../components/farmer/farmer-list/FarmerList';

function PoolFarmerDetail() {
  const navigate = useNavigate();
  const poolId = usePoolFarmerId();

  const {
    data: pool,
    isLoading: isLoadingPool,
    error: poolError,
  } = useGetFarmerPoolsId(poolId);

  const {
    data: farmers,
    isLoading: isLoadingFarmers,
    error: farmersError,
  } = useGetFarmersAll();

  const { mutate: addFarmerToPool } = usePostFarmerPoolsIdAddFarmer();

  console.log('pool', pool);
  console.log('poolId', poolId);

  const handleStartPool = () => {
    // Implement start pool logic here
    console.log('Start pool:', pool?.id);
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

  const selectedFarmersIds = pool.farmers.map((farmer) => farmer.id);

  const onFarmerSelect = (farmerId: string) => {
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
    } catch (err) {
      console.error('Failed to add farmer to pool:', err);
    }
  };

  return (
    <BasePoolWrapper pool={pool.basePool} onStart={handleStartPool}>
      {/* {runsData?.runs?.length > 0 && (
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
      )} */}
      <FarmerPicker
        label="Add farmer to pool"
        selectedFarmerIds={selectedFarmersIds}
        onFarmerSelect={onFarmerSelect}
      />
      <FarmerList farmers={pool.farmers} />
      {/* <PoolFarmerCard farmerPool={pool} /> */}
    </BasePoolWrapper>
  );
}

export default PoolFarmerDetail;
