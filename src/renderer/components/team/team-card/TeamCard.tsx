import LeekList from '../../leek/leek-list/LeekList';
import TurretCard from '../../turret/turret-card/TurretCard';
import { ITeamCardProps } from './TeamCard.types';
import { teamCardStyles as styles } from './TeamCard.styles';

function TeamCard({ team }: ITeamCardProps) {
  return (
    <div style={styles.container}>
      <h2 style={styles.name}>{team.name}</h2>
      {/* <TurretImage turret={team.turret} /> */}
      <TurretCard turret={team.turret} />
      <LeekList leeks={team.leeks} />
    </div>
  );
}

export default TeamCard;
