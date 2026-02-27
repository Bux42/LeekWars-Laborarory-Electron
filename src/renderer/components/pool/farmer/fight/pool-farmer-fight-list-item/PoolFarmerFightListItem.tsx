import { useState, useMemo } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Spin, message } from 'antd';
import { LeekResponse } from '../../../../../../services/leekwarsToolsAPI.schemas';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import LeekImage from '../../../../leek/leek-image/LeekImage';
import { IPoolFarmerFightListItemProps } from './PoolFarmerFightListItem.types';
import { poolFarmerFightListItemStyles as styles } from './PoolFarmerListItem.styles';
import { usePostFightGenerate } from '../../../../../../services/fights/fights';

function PoolFarmerFightListItem({
  fight,
  farmer1,
  farmer2,
}: IPoolFarmerFightListItemProps) {
  const [generatingFight, setGeneratingFight] = useState<boolean>(false);

  const draw = useMemo(() => {
    if (!fight.winnerFarmerId) {
      return true;
    }
    return false;
  }, [fight.winnerFarmerId]);

  const { mutate: generateFight } = usePostFightGenerate();

  const getFightColor = (farmerId: string): 'win' | 'lose' | 'draw' => {
    if (draw) {
      return 'draw';
    }
    return fight.winnerFarmerId === farmerId ? 'win' : 'lose';
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
        <div style={styles.farmerContainer(getFightColor(farmer1.id))}>
          <div style={styles.leekContent}>
            <Typography.Text
              style={styles.farmerName(getFightColor(farmer1.id))}
            >
              {farmer1.name}
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
        <div style={styles.farmerContainer(getFightColor(farmer2.id))}>
          <div style={styles.leekContent}>
            <LeekImage
              leek={farmer2 as unknown as LeekResponse}
              showTooltip
              height={30}
              width={30}
            />

            <Typography.Text
              style={styles.farmerName(getFightColor(farmer2.id))}
            >
              {farmer2.name}
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

export default PoolFarmerFightListItem;
