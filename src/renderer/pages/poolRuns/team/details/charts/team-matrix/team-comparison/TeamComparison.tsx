import { teamComparisonStyles as styles } from './TeamComparison.styles';
import TeamCard from '../../../../../../../components/team/team-card/TeamCard';
import { ITeamComparisonProps } from './TeamComparison.types';
import { PoolTeamResponseToTeamResponse } from '../../../../../../../mappers/TeamMapper';

function TeamComparison({ team1, team2, value }: ITeamComparisonProps) {
  return (
    <div style={styles.container}>
      <div style={styles.teamDetailContainer}>
        <TeamCard team={PoolTeamResponseToTeamResponse(team1)} />
      </div>
      <div style={styles.vsAndValueContainer}>
        <div style={styles.vsText}>VS</div>
        <div style={styles.valueContainer}>{value.toFixed(2)}%</div>
      </div>
      {/* Spacer between the two details */}
      <div style={styles.teamDetailContainer}>
        <TeamCard team={PoolTeamResponseToTeamResponse(team2)} />
      </div>
    </div>
  );
}

export default TeamComparison;
