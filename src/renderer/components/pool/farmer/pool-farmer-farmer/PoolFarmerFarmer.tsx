import { IPoolFarmerFarmerProps } from './PoolFarmerFarmer.types';
import { poolFarmerFarmerStyles as styles } from './PoolFarmerFarmer.styles';
import { getImage } from '../../../../utils/ImageLoader';
import LeekList from '../../../leek/leek-list/LeekList';

function PoolFarmerFarmer({ farmer }: IPoolFarmerFarmerProps) {
  return (
    <div style={styles.container}>
      <div style={styles.eloAndNameContainer}>
        <h3 style={styles.title}>{farmer.name}</h3>
        <div style={styles.eloContainer}>
          {/* assets\leekwars\image\talent.png */}
          <img
            src={getImage('leekwars/image/talent')}
            alt="talent"
            style={styles.eloIcon}
          />
          <div style={styles.eloValue}>{farmer.elo}</div>
        </div>
      </div>

      <div>
        <LeekList leeks={farmer.leeks} />
      </div>
    </div>
  );
}

export default PoolFarmerFarmer;
