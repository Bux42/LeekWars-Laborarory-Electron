import { useEffect, useState } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePoolTeamId } from '../../../../../hooks/pools/team/usePoolTeamId';
import {
  useGetTeamPoolsId,
  useGetTeamPoolsIdRunsInfo,
} from '../../../../../services/team-pools/team-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import { TeamPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import { usePostTeamPoolRunIdStart } from '../../../../../services/team-pool-runs/team-pool-runs';
import LastPoolRunsButttons from '../../../../components/pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';
import PoolTeamCard from '../../../../components/pool/team/pool-team-card.tsx/PoolTeamCard';
import Spinner from '../../../../components/shared/spinner/Spinner';

function PoolTeamDetail() {
  const navigate = useNavigate();
  const poolId = usePoolTeamId();

  const {
    data: pool,
    isLoading: isLoadingPool,
    error: poolError,
  } = useGetTeamPoolsId(poolId);

  const [teamPool, setTeamPool] = useState<TeamPoolResponse | undefined>(pool);
  const [selectedTeamsIds, setSelectedTeamsIds] = useState<string[]>([]);

  const startTeamPoolRunMutation = usePostTeamPoolRunIdStart();

  const {
    data: runsInfo,
    isLoading: runsInfoLoading,
    error: runsInfoError,
  } = useGetTeamPoolsIdRunsInfo(poolId || '');

  useEffect(() => {
    if (pool) {
      setTeamPool(pool);
      setSelectedTeamsIds(pool.teams.map((team) => team.id));
    }
  }, [pool]);

  const handleStartPool = async () => {
    if (!poolId) return;
    try {
      const result = await startTeamPoolRunMutation.mutateAsync({ id: poolId });
      if (result.id) {
        navigate(`/pools/team/${poolId}/runs/${result.id}`);
      }
    } catch (error) {
      console.error('Error starting team pool run:', error);
    }
  };

  if (isLoadingPool || runsInfoLoading) {
    return <Spinner label="Loading pool details..." />;
  }

  if (poolError || runsInfoError || !pool || !pool.basePool) {
    return <Result status="error" title="Error loading pool details" />;
  }

  return (
    <BasePoolWrapper
      pool={pool.basePool}
      onStart={handleStartPool}
      totalCombinations={selectedTeamsIds.length || 0}
    >
      {runsInfo && (
        <LastPoolRunsButttons
          poolRunsInfo={runsInfo}
          poolType="team"
          poolId={pool.id}
        />
      )}
      {teamPool && <PoolTeamCard pool={teamPool} />}
    </BasePoolWrapper>
  );
}

export default PoolTeamDetail;
