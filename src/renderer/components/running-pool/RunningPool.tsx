import React, { useMemo } from 'react';
import {
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Progress } from 'antd';
import { runningPoolStyles as styles } from './RunningPool.styles';
import { theme } from '../../theme';
import { IRunningPoolProps } from './RunningPool.types';
import { usePoolFightCountWs } from '../../../hooks/fights/usePoolFightCountWs';
import { getTimeAgo } from '../../utils/DateUtils';

function RunningPool({ runningPool, onHide }: IRunningPoolProps) {
  const navigate = useNavigate();
  const [totalFights, setTotalFights] = React.useState(runningPool.totalFights);
  const [fightCount, setFightCount] = React.useState(
    runningPool.completedFights,
  );

  const handleViewRunClick = () => {
    navigate(
      `/pools/${runningPool.type}/${typeof runningPool.bossType === 'string' ? `${runningPool.bossType}/` : ''}${runningPool.poolId}/runs/${runningPool.poolRunId}`,
    );
  };

  usePoolFightCountWs(
    runningPool.type,
    runningPool.bossType,
    runningPool.poolRunId,
    (count, total) => {
      // update to ws fight count event for this specific pool run
      setFightCount(count);
      setTotalFights(total);
    },
  );

  const percent = useMemo(
    () => Math.round((fightCount / totalFights) * 100),
    [fightCount, totalFights],
  );

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).style.color = theme.colors.border.focus;
  };

  const onMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).style.color = theme.colors.text.primary;
  };

  return (
    <div style={styles.container}>
      <div style={styles.spaceBetweenContainer}>
        <Button
          style={styles.poolName}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onClick={handleViewRunClick}
        >
          <EyeOutlined />
        </Button>
        <Button
          style={styles.poolName}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          disabled={percent < 100}
          onClick={() => onHide(runningPool.poolRunId)}
        >
          <EyeInvisibleOutlined />
        </Button>
      </div>
      <div style={styles.runDetails}>
        <h4>{runningPool.name}</h4>
        {percent < 100 ? (
          <Progress percent={percent} status="active" size="small" />
        ) : (
          <div style={styles.spaceBetweenContainer}>
            <CheckCircleOutlined
              style={{ color: theme.colors.accent.success }}
            />
            <p>Started {getTimeAgo(runningPool.startTime)}</p>
          </div>
        )}
        <p>{fightCount} Fights</p>
      </div>
    </div>
  );
}

export default RunningPool;
