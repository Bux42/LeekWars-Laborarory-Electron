import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'antd';
import { runningPoolStyles as styles } from './RunningPool.styles';
import { theme } from '../../theme';
import { IRunningPoolProps } from './RunningPool.types';

function RunningPool({ runningPool }: IRunningPoolProps) {
  const navigate = useNavigate();

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
      `/pools/${runningPool.type}/${runningPool.poolId}/runs/${runningPool.poolRunId}`,
    );
  };

  const percent = Math.round(
    (runningPool.completedFights / runningPool.totalFights) * 100,
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

      <Progress percent={percent} status="active" size="small" />
    </div>
  );
}

export default RunningPool;
