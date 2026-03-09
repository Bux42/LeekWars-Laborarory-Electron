import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoolTeamId } from '../../../../../hooks/pools/team/usePoolTeamId';
import {
  useDeleteTeamPoolsIdRemoveTeamTeamId,
  useGetTeamPoolsId,
  useGetTeamPoolsIdRunsInfo,
  usePostTeamPoolsIdAddTeam,
} from '../../../../../services/team-pools/team-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import { TeamPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import TeamPicker from '../../../../components/team/team-picker/TeamPicker';
import TeamList from '../../../../components/team/team-list/TeamList';
import { useGetTeamsAll } from '../../../../../services/teams/teams';
import { usePostTeamPoolRunIdStart } from '../../../../../services/team-pool-runs/team-pool-runs';
import LastPoolRunsButttons from '../../../../components/pool-runs/last-pool-runs-buttons/LastPoolRunsButttons';

function PoolTeamDetail() {
  const navigate = useNavigate();
  const poolId = usePoolTeamId();

  const {
    data: pool,
    isLoading: isLoadingPool,
    error: poolError,
  } = useGetTeamPoolsId(poolId);

  const {
    data: allTeams,
    isLoading: isLoadingAllTeams,
    error: allTeamsError,
  } = useGetTeamsAll(poolId);

  const [teamPool, setTeamPool] = useState<TeamPoolResponse | null>(pool);
  const [selectedTeamsIds, setSelectedTeamsIds] = useState<string[]>([]);

  const removeTeamFromPoolMutation = useDeleteTeamPoolsIdRemoveTeamTeamId();
  const addTeamToPoolMutation = usePostTeamPoolsIdAddTeam();
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

  const onAddTeamToPool = async (teamId: string) => {
    try {
      const response = await addTeamToPoolMutation.mutateAsync({
        data: { teamId },
        id: poolId,
      });
      setSelectedTeamsIds((prev) => [...prev, teamId]);
      setTeamPool((prev) => {
        if (!prev) return prev;
        const newTeam = allTeams?.teams.find((t) => t.id === teamId);
        if (!newTeam) return prev;
        return {
          ...prev,
          teams: [...prev.teams, newTeam],
        };
      });
    } catch (error) {
      console.error('Error adding team to pool:', error);
    }
  };

  const onRemoveTeamFromPool = async (teamId: string) => {
    try {
      await removeTeamFromPoolMutation.mutateAsync({ id: poolId, teamId });
      setSelectedTeamsIds((prev) => prev.filter((id) => id !== teamId));
      setTeamPool((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          teams: prev.teams.filter((team) => team.id !== teamId),
        };
      });
    } catch (error) {
      console.error('Error removing team from pool:', error);
    }
    // Implement the logic to remove a team from the pool
  };

  if (isLoadingPool || isLoadingPool) {
    return <p>Loading pool details...</p>;
  }

  if (poolError || poolError || !pool || !pool.basePool) {
    return (
      <p style={{ color: 'red' }}>
        {poolError || poolError
          ? 'Error: Failed to fetch pool details'
          : 'Pool not found'}
      </p>
    );
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
      {allTeams?.teams.length && (
        <TeamPicker
          label="Add team to pool"
          availableTeams={allTeams.teams}
          selectedTeamIds={selectedTeamsIds}
          onTeamSelect={onAddTeamToPool}
        />
      )}
      {teamPool && teamPool.teams.length > 0 && (
        <TeamList
          teams={teamPool.teams}
          onRemoveTeam={onRemoveTeamFromPool}
          showRemoveTeamButton
        />
      )}
    </BasePoolWrapper>
  );
}

export default PoolTeamDetail;
