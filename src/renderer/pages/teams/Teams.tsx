import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { teamsStyles as styles } from './Teams.styles';
import {
  useDeleteTeamsDeleteTeamId,
  useGetTeamsAll,
} from '../../../services/teams/teams';
import TeamCard from '../../components/team/team-card/TeamCard';
import Spinner from '../../components/shared/spinner/Spinner';
import { TeamResponse } from '../../../services/leekwarsToolsAPI.schemas';

function Teams() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState<TeamResponse[]>([]);

  const {
    data: teamsData,
    isLoading: isTeamsLoading,
    isError: isTeamsError,
  } = useGetTeamsAll();

  useEffect(() => {
    if (teamsData?.teams) {
      setTeams(teamsData.teams);
    }
  }, [teamsData]);

  const deleteTeamMutation = useDeleteTeamsDeleteTeamId();

  const handleDeleteTeam = async (teamId: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await deleteTeamMutation.mutate({ teamId });
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
      } catch {
        alert('Failed to delete team. Please try again.');
      }
    }
  };

  if (isTeamsLoading) {
    return <Spinner size="small" label="Loading teams..." />;
  }

  if (isTeamsError) {
    return <Result status="error" title="Error loading teams" />;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Teams</h1>
        <Button onClick={() => navigate('/new-team')}>Add Team</Button>
      </div>

      {teams.length === 0 ? (
        <Result
          status="info"
          title="No teams found. Click 'Add Team' to create your first team!"
        />
      ) : (
        <div style={styles.teamList}>
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              showDeleteButton
              onDelete={handleDeleteTeam}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Teams;
