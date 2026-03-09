import { useNavigate } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { ILastPoolRunsButtonsProps } from './LastPoolRunsButttons.types';
import { lastPoolRunsButttonsStyles as styles } from './LastPoolRunsButttons.styles';

function LastPoolRunsButttons({
  poolRunsInfo,
  poolType,
  poolId,
}: ILastPoolRunsButtonsProps) {
  const navigate = useNavigate();

  const onViewLastRun = () => {
    if (poolRunsInfo?.lastRunId) {
      navigate(`/pools/${poolType}/${poolId}/runs/${poolRunsInfo.lastRunId}`);
    }
  };

  const onViewAllRuns = () => {
    if (poolRunsInfo?.lastRunId) {
      navigate(`/pools/${poolType}/${poolId}/runs`);
    }
  };

  return (
    <div style={styles.container}>
      <Button disabled={!poolRunsInfo?.lastRunId} onClick={onViewLastRun}>
        Last Run{' '}
        {poolRunsInfo.lastRunIsRunning && (
          <Spin size="small" style={{ marginLeft: 8 }} />
        )}
      </Button>
      <Button disabled={!poolRunsInfo?.lastRunId} onClick={onViewAllRuns}>
        All Runs ({poolRunsInfo?.runCount ? poolRunsInfo.runCount : 0})
      </Button>
    </div>
  );
}

export default LastPoolRunsButttons;
