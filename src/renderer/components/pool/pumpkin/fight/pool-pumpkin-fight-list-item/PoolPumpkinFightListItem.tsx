import { Col, Row, Spin, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import useGenerateFight from '../../../../../../hooks/fights/useGenerateFight';
import { usePostFightPumpkinGenerate } from '../../../../../../services/pumpkin-fights/pumpkin-fights';
import { IPoolPumpkinFightListItemProps } from './PoolPumpkinFightListItem.types';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import { poolPumpkinFightListItemStyles as styles } from './PoolPumpkinFightListItem.styles';

function PoolPumpkinFightListItem({
  leekGroup,
  fight,
}: IPoolPumpkinFightListItemProps) {
  const { generatingFight, handleGenerateFight } = useGenerateFight(
    usePostFightPumpkinGenerate,
  );

  const getFightColor = (fightResult: string): 'win' | 'lose' | 'draw' => {
    if (fightResult === 'draw') {
      return 'draw';
    }
    return fightResult === 'win' ? 'win' : 'lose';
  };

  return (
    <Row gutter={16} style={styles.row}>
      <Col span={8} style={styles.column}>
        <div style={styles.teamContainer(getFightColor(fight.result))}>
          <div style={styles.leekContent}>
            <Typography.Text
              style={styles.teamName(getFightColor(fight.result))}
            >
              {leekGroup.name}
            </Typography.Text>
          </div>
        </div>
      </Col>

      <Col span={2} style={styles.column}>
        <Typography.Text style={styles.resultContainer}>
          {fight.result === 'draw' ? 'Draw' : 'VS'}
        </Typography.Text>
      </Col>

      <Col span={8} style={styles.column}>
        <div style={styles.teamContainer(getFightColor(fight.result))}>
          <div style={styles.leekContent}>
            <Typography.Text
              style={styles.teamName(getFightColor(fight.result))}
            >
              Evil Pumpkin
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

export default PoolPumpkinFightListItem;
