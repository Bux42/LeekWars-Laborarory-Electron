import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { teamsStyles as styles } from './Teams.styles';
import { useGetTeamsAll } from '../../../services/teams/teams';
import TeamCard from '../../components/team/team-card/TeamCard';
import Spinner from '../../components/shared/spinner/Spinner';

function Teams() {
  const navigate = useNavigate();

  const {
    data: teamsData,
    isLoading: isTeamsLoading,
    isError: isTeamsError,
  } = useGetTeamsAll();

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

      {teamsData?.teams.length === 0 ? (
        <Result
          status="info"
          title="No teams found. Click 'Add Team' to create your first team!"
        />
      ) : (
        <div style={styles.teamList}>
          {teamsData?.teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </>
  );
}

export default Teams;
