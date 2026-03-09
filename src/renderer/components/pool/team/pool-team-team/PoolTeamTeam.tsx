import { IPoolTeamTeamProps } from './PoolTeamTeam.types';
import { poolTeamTeamStyles as styles } from './PoolTeamTeam.styles';
import { getImage } from '../../../../utils/ImageLoader';
import LeekList from '../../../leek/leek-list/LeekList';
import TurretList from '../../../turret/turret-list/TurretList';

function PoolTeamTeam({ team }: IPoolTeamTeamProps) {
  return (
    <div style={styles.container}>
      <div style={styles.eloAndNameContainer}>
        <h3 style={styles.title}>{team.name}</h3>
        <div style={styles.eloContainer}>
          {/* assets\leekwars\image\talent.png */}
          <img
            src={getImage('leekwars/image/talent')}
            alt="talent"
            style={styles.eloIcon}
          />
          <div style={styles.eloValue}>{team.elo}</div>
        </div>
      </div>

      <div>
        <TurretList turrets={[team.turret]} />
        <LeekList leeks={team.leeks} />
      </div>
    </div>
  );
}

export default PoolTeamTeam;
