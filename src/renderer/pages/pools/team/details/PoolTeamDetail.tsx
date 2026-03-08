import { useEffect, useState } from 'react';
import { usePoolTeamId } from '../../../../../hooks/pools/team/usePoolTeamId';
import { useGetTeamPoolsId } from '../../../../../services/team-pools/team-pools';
import BasePoolWrapper from '../../../../components/pool/base/base-pool-wrapper/BasePoolWrapper';
import { TeamPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import TeamPicker from '../../../../components/team/team-picker/TeamPicker';
import TeamList from '../../../../components/team/team-list/TeamList';

function PoolTeamDetail() {
  const poolId = usePoolTeamId();

  const {
    data: pool,
    isLoading: isLoadingPool,
    error: poolError,
  } = useGetTeamPoolsId(poolId);

  const [teamPool, setTeamPool] = useState<TeamPoolResponse | null>(pool);
  const [selectedTeamsIds, setSelectedTeamsIds] = useState<string[]>([]);

  useEffect(() => {
    if (pool) {
      setTeamPool(pool);
      setSelectedTeamsIds(pool.teams.map((team) => team.id));
    }
  }, [pool]);

  const handleStartPool = () => {
    // Implement the logic to start the pool with the selected teams
    console.log('Starting pool with teams:', selectedTeamsIds);
  };

  const onAddTeamToPool = (teamId: string) => {
    // Implement the logic to add a team to the pool
    setSelectedTeamsIds((prev) => [...prev, teamId]);
  };

  const onRemoveTeamFromPool = (teamId: string) => {
    // Implement the logic to remove a team from the pool
    setSelectedTeamsIds((prev) => prev.filter((id) => id !== teamId));
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
      {teamPool?.teams.length && (
        <TeamPicker
          label="Add team to pool"
          availableTeams={teamPool.teams || []}
          selectedTeamIds={selectedTeamsIds}
          onTeamSelect={onAddTeamToPool}
        />
      )}
      {teamPool && (
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
