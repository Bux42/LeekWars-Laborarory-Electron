import { Button } from 'antd';
import LeekList from '../../leek/leek-list/LeekList';
import TurretCard from '../../turret/turret-card/TurretCard';
import { ITeamListProps } from './TeamList.types';
import { teamListStyles as styles } from './TeamList.styles';
import TurretList from '../../turret/turret-list/TurretList';

function TeamList({
  teams,
  onRemoveTeam,
  showRemoveTeamButton,
}: ITeamListProps) {
  return (
    <div style={styles.container}>
      {teams.map((team) => (
        <div key={team.id} style={styles.teamContainer}>
          <div style={styles.titleAndButtonContainer}>
            <h1>{team.name}</h1>
            {showRemoveTeamButton && onRemoveTeam && (
              <Button
                type="primary"
                danger
                onClick={() => onRemoveTeam(team.id)}
              >
                Remove Team
              </Button>
            )}
          </div>
          <TurretList turrets={team.turret ? [team.turret] : []} />
          {/* <TurretCard turret={team.turret} /> */}
          <LeekList leeks={team.leeks} />
        </div>
      ))}
    </div>
  );
}

export default TeamList;
