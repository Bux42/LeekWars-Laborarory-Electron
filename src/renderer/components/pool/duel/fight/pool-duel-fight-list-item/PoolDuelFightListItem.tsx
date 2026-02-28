import { useMemo, useState } from 'react';
import { Col, Row, Spin, Typography, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IPoolDuelFightListItemProps } from './PoolDuelFightListItem.types';
import { poolDuelFightListItemStyles as styles } from './PoolDuelFightListItem.styles';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import LeekImage from '../../../../leek/leek-image/LeekImage';
import { LeekResponse } from '../../../../../../services/leekwarsToolsAPI.schemas';
import { usePostFightDuelGenerate } from '../../../../../../services/duel-fights/duel-fights';

function PoolDuelFightListItem({
  fight,
  leek1,
  leek2,
}: IPoolDuelFightListItemProps) {
  const [generatingFight, setGeneratingFight] = useState<boolean>(false);

  const draw = useMemo(() => {
    if (!fight.winnerLeekId) {
      return true;
    }
    return false;
  }, [fight.winnerLeekId]);

  const { mutate: generateFight } = usePostFightDuelGenerate();

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
        onError: () => {
          message.error('Failed to generate fight.');
        },
        onSettled: () => {
          setGeneratingFight(false);
        },
      },
    );
  };

  return (
    <Row gutter={16} style={styles.row}>
      <Col span={8} style={styles.column}>
        <div style={styles.leekContainer(getFightColor(leek1.id))}>
          <div style={styles.leekContent}>
            <LeekImage
              leek={leek1 as unknown as LeekResponse}
              showTooltip
              height={30}
              width={30}
            />
            <Typography.Text style={styles.leekName(getFightColor(leek1.id))}>
              {leek1.name}
            </Typography.Text>
          </div>
        </div>
      </Col>

      <Col span={2} style={styles.column}>
        <Typography.Text style={styles.resultContainer}>
          {draw ? 'Draw' : 'VS'}
        </Typography.Text>
      </Col>

      <Col span={8} style={styles.column}>
        <div style={styles.leekContainer(getFightColor(leek2.id))}>
          <div style={styles.leekContent}>
            <LeekImage
              leek={leek2 as unknown as LeekResponse}
              showTooltip
              height={30}
              width={30}
            />

            <Typography.Text style={styles.leekName(getFightColor(leek2.id))}>
              {leek2.name}
            </Typography.Text>
          </div>
        </div>
      </Col>

      <Col span={4} style={styles.column}>
        <Typography.Text style={styles.dateText}>
          {getTimeAgo(fight.date)}
        </Typography.Text>
      </Col>

      <Col span={2} style={styles.column}>
        {generatingFight ? (
          <div style={styles.spin}>
            <Spin size="small" />
          </div>
        ) : (
          <div style={styles.actionContainer}>
            <EyeOutlined style={styles.eyeIcon} onClick={handleGenerateFight} />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PoolDuelFightListItem;
