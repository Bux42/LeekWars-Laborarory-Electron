import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { teamsStyles as styles } from './Teams.styles';
import { useGetTeamsAll } from '../../../services/teams/teams';
import TeamCard from '../../components/team/team-card/TeamCard';

function Teams() {
  const navigate = useNavigate();

  const {
    data: teamsData,
    isLoading: isTeamsLoading,
    isError: isTeamsError,
  } = useGetTeamsAll();

  if (isTeamsLoading) {
    return <p>Loading teams...</p>;
  }

  if (isTeamsError) {
    return <p>Failed to load teams. Please try again later.</p>;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Teams</h1>
        <Button onClick={() => navigate('/new-team')}>Add Team</Button>
      </div>

      {teamsData?.teams.length === 0 ? (
        <p>No teams found.</p>
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
