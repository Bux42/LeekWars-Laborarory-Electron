import React, { useMemo } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'antd';
import { runningPoolStyles as styles } from './RunningPool.styles';
import { theme } from '../../theme';
import { IRunningPoolProps } from './RunningPool.types';
import { usePoolFightCountWs } from '../../../hooks/fights/usePoolFightCountWs';

function RunningPool({ runningPool }: IRunningPoolProps) {
  const navigate = useNavigate();
  const [totalFights, setTotalFights] = React.useState(runningPool.totalFights);
  const [fightCount, setFightCount] = React.useState(
    runningPool.completedFights,
  );

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).style.border =
      `1px solid ${theme.colors.border.focus}`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).style.border =
      `1px solid ${theme.colors.border.primary}`;
  };

  const handleClick = () => {
    navigate(
      `/pools/${runningPool.type}/${typeof runningPool.bossType === 'string' ? `${runningPool.bossType}/` : ''}${runningPool.poolId}/runs/${runningPool.poolRunId}`,
    );
  };

  usePoolFightCountWs(
    runningPool.type,
    runningPool.bossType,
    runningPool.poolRunId,
    (count, total) => {
      // update the fight count for this running pool
      setFightCount(count);
      setTotalFights(total);
    },
  );

  const percent = useMemo(
    () => Math.round((fightCount / totalFights) * 100),
    [fightCount, totalFights],
  );

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <h5>{runningPool.name}</h5>

      {percent < 100 ? (
        <Progress percent={percent} status="active" size="small" />
      ) : (
        <CheckCircleOutlined style={{ color: theme.colors.accent.success }} />
      )}
    </div>
  );
}

export default RunningPool;
