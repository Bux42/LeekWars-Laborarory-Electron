import { useMemo } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Spin } from 'antd';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import { IPoolFarmerFightListItemProps } from './PoolFarmerFightListItem.types';
import { poolFarmerFightListItemStyles as styles } from './PoolFarmerListItem.styles';
import { usePostFightFarmerGenerate } from '../../../../../../services/farmer-fights/farmer-fights';
import useGenerateFight from '../../../../../../hooks/fights/useGenerateFight';

function PoolFarmerFightListItem({
  fight,
  farmer1,
  farmer2,
}: IPoolFarmerFightListItemProps) {
  const draw = useMemo(() => {
    if (!fight.winnerFarmerId) {
      return true;
    }
    return false;
  }, [fight.winnerFarmerId]);

  const { generatingFight, handleGenerateFight } = useGenerateFight(
    usePostFightFarmerGenerate,
  );

  const getFightColor = (farmerId: string): 'win' | 'lose' | 'draw' => {
    if (draw) {
      return 'draw';
    }
    return fight.winnerFarmerId === farmerId ? 'win' : 'lose';
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
          <div style={styles.actionContainer}>
            <Spin size="small" />
          </div>
        ) : (
          <div style={styles.actionContainer}>
            <EyeOutlined
              style={styles.eyeIcon}
              onClick={() => handleGenerateFight(fight.id)}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PoolFarmerFightListItem;
