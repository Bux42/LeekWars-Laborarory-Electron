import { useMemo } from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IPoolTeamFightListItemProps } from './PoolTeamFightListItem.types';
import { getTimeAgo } from '../../../../../utils/DateUtils';
import { poolTeamFightListItemStyles as styles } from './PoolTeamFightListItem.styles';
import { usePostFightTeamGenerate } from '../../../../../../services/team-fights/team-fights';
import useGenerateFight from '../../../../../../hooks/fights/useGenerateFight';

function PoolTeamFightListItem({
  fight,
  team1,
  team2,
}: IPoolTeamFightListItemProps) {
  const draw = useMemo(() => {
    if (!fight.winnerTeamId) {
      return true;
    }
    return false;
  }, [fight.winnerTeamId]);

  const { generatingFight, handleGenerateFight } = useGenerateFight(
    usePostFightTeamGenerate,
  );

  const getFightColor = (teamId: string): 'win' | 'lose' | 'draw' => {
    if (draw) {
      return 'draw';
    }
    return fight.winnerTeamId === teamId ? 'win' : 'lose';
  };

  return (
    <Row gutter={16} style={styles.row}>
      <Col span={8} style={styles.column}>
        <div style={styles.teamContainer(getFightColor(team1.id))}>
          <div style={styles.leekContent}>
            <Typography.Text style={styles.teamName(getFightColor(team1.id))}>
              {team1.name}
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
        <div style={styles.teamContainer(getFightColor(team2.id))}>
          <div style={styles.leekContent}>
            <Typography.Text style={styles.teamName(getFightColor(team2.id))}>
              {team2.name}
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

export default PoolTeamFightListItem;
