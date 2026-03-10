import { useState } from 'react';
import { TeamPoolResponse } from '../../../../../services/leekwarsToolsAPI.schemas';
import TeamList from '../../../team/team-list/TeamList';
import TeamPicker from '../../../team/team-picker/TeamPicker';
import { poolTeamCardStyles as styles } from './PoolTeamCard.styles';
import { IPoolTeamCardProps } from './PoolTeamCard.types';
import { useGetTeamsAll } from '../../../../../services/teams/teams';
import {
  useDeleteTeamPoolsIdRemoveTeamTeamId,
  usePostTeamPoolsIdAddTeam,
} from '../../../../../services/team-pools/team-pools';
import LoadingText from '../../../text/loading-text/LoadingText';
import Spinner from '../../../shared/spinner/Spinner';

function PoolTeamCard({ pool: poolProp }: IPoolTeamCardProps) {
  const [pool, setPool] = useState<TeamPoolResponse>(poolProp);

  const {
    data: allTeams,
    isLoading: isLoadingAllTeams,
    error: allTeamsError,
  } = useGetTeamsAll({
    query: {
      queryKey: ['teams'],
    },
  });

  const removeTeamFromPoolMutation = useDeleteTeamPoolsIdRemoveTeamTeamId();
  const addTeamToPoolMutation = usePostTeamPoolsIdAddTeam();

  const onAddTeamToPool = async (teamId: string) => {
    try {
      await addTeamToPoolMutation.mutateAsync({
        id: pool.id,
        data: {
          teamId,
        },
      });
      setPool((prevPool) => ({
        ...prevPool,
        teams: [
          ...prevPool.teams,
          allTeams?.teams.find((team) => team.id === teamId)!,
        ],
      }));
    } catch (err) {
      console.error('Failed to add team to pool:', err);
    }
  };

  const onRemoveTeamFromPool = async (teamId: string) => {
    if (
      window.confirm(`Are you sure you want to remove this team from the pool?`)
    ) {
      try {
        await removeTeamFromPoolMutation.mutateAsync({
          id: pool.id,
          teamId,
        });
        setPool((prevPool) => ({
          ...prevPool,
          teams: prevPool.teams.filter((team) => team.id !== teamId),
        }));
      } catch (err) {
        console.error('Failed to remove team from pool:', err);
      }
    }
  };

  if (isLoadingAllTeams) {
    return <Spinner size="small" label="Loading teams..." />;
  }

  if (allTeamsError) {
    return <p style={styles.errorText}>Error loading teams</p>;
  }

  return (
    <div style={styles.container}>
      {allTeams?.teams.length && (
        <TeamPicker
          label="Add team to pool"
          availableTeams={allTeams.teams}
          selectedTeamIds={pool.teams.map((team) => team.id)}
          onTeamSelect={onAddTeamToPool}
        />
      )}
      {pool && pool.teams.length > 0 && (
        <TeamList
          teams={pool.teams}
          onRemoveTeam={onRemoveTeamFromPool}
          showRemoveTeamButton
        />
      )}
    </div>
  );
}

export default PoolTeamCard;
