import { getImage } from '../../../../utils/ImageLoader';
import { IPoolDuelLeekProps } from './PoolDuelLeek.types';
import { poolDuelLeekStyles } from './PoolDuelLeek.styles';
import LeekImage from '../../../leek/leek-image/LeekImage';

function PoolDuelLeek({ leek }: IPoolDuelLeekProps) {
  return (
    <div style={poolDuelLeekStyles.container}>
      <LeekImage leek={leek} showTooltip height={40} width={40} />
      <div style={poolDuelLeekStyles.details}>
        <div style={poolDuelLeekStyles.name}>{leek.name}</div>
        <div>Level {leek.build.level}</div>
      </div>
      <div style={poolDuelLeekStyles.eloContainer}>
        {/* assets\leekwars\image\talent.png */}
        <img
          src={getImage('leekwars/image/talent')}
          alt="talent"
          style={poolDuelLeekStyles.eloIcon}
        />
        <div style={poolDuelLeekStyles.eloValue}>{leek.elo}</div>
      </div>
    </div>
  );
}

export default PoolDuelLeek;
