import { useMemo, useState } from 'react';
import { Col, Image, Row, Spin, Tooltip, Typography, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IPoolDuelFightListItemProps } from './PoolDuelFightListItem.types';
import { poolDuelFightListItemStyles as styles } from './PoolDuelFightListItem.styles';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import { usePostFightGenerate } from '../../../../../../services/fights/fights';
import { getImage } from '../../../../../utils/ImageLoader';
import HoverTooltip from '../../../../shared/hover-tooltip/HoverTooltip';
import LeekDetail from '../../../../leek/leek-detail/LeekDetail';

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
            <HoverTooltip tooltip={<LeekDetail leek={leek1} />}>
              <Image
                preview={false}
                src={getImage(
                  `leekwars/image/leek/${leek1.imageName ?? 'leek/1'}`,
                )}
                alt={leek1.name ?? 'Leek'}
                style={styles.leekImage}
                width={40}
                height={40}
              />
            </HoverTooltip>
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
            <HoverTooltip tooltip={<LeekDetail leek={leek2} />}>
              <Image
                preview={false}
                src={getImage(
                  `leekwars/image/leek/${leek2.imageName ?? 'leek/1'}`,
                )}
                alt={leek2.name ?? 'Leek'}
                style={styles.leekImage}
                width={40}
                height={40}
              />
            </HoverTooltip>
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
