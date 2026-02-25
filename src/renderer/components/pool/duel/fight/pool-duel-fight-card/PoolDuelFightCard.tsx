import { useMemo, useState } from 'react';
import { Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IPoolDuelFightCardProps } from './PoolDuelFightCard.types';
import { poolDuelFightCardStyles as styles } from './PoolDuelFightCard.styles';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import { usePostFightGenerate } from '../../../../../../services/fights/fights';

function PoolDuelFightCard({ fight, leek1, leek2 }: IPoolDuelFightCardProps) {
  const [generatingFight, setGeneratingFight] = useState<boolean>(false);

  const draw = useMemo(() => {
    if (!fight.winnerLeekId) {
      return true;
    }
    return false;
  }, [fight.winnerLeekId]);

  const { mutate: generateFight } = usePostFightGenerate();

  const getFightColor = (leekId: string): 'win' | 'lose' | 'draw' => {
    if (draw) {
      return 'draw';
    }
    return fight.winnerLeekId === leekId ? 'win' : 'lose';
  };

  const handleGenerateFight = () => {
    setGeneratingFight(true);
    generateFight(
      {
        data: {
          fightId: fight.id,
        },
      },
      {
        onSuccess: () => {
          const fightUrl = new URL(
            `fight/${fight.id}`,
            process.env.VUE_FRONT_END_URL || 'http://localhost:8080/',
          ).toString();

          window.open(fightUrl, '_blank');
        },
        onError: (err) => {
          console.error('Failed to generate fight:', err);
        },
        onSettled: () => {
          setGeneratingFight(false);
        },
      },
    );
  };

  return (
    <div style={styles.fightCard}>
      <div style={styles.leekContainer(getFightColor(leek1.id))}>
        {leek1.name}
      </div>
      <div style={styles.resultContainer}>{draw ? 'Draw' : 'VS'}</div>
      <div style={styles.leekContainer(getFightColor(leek2.id))}>
        {leek2.name}
      </div>
      {getTimeAgo(fight.date)}
      {generatingFight ? (
        <Spin style={styles.spin} />
      ) : (
        <EyeOutlined style={styles.eyeIcon} onClick={handleGenerateFight} />
      )}
    </div>
  );
}

export default PoolDuelFightCard;
