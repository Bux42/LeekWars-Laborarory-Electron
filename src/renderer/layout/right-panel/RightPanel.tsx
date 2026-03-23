import { Result } from 'antd';
import { rightPanelStyles as styles } from './RightPanel.styles';
import RunningPool from '../../components/running-pool/RunningPool';
import { useGetAllRunningPools } from '../../../services/all-pool-runs/all-pool-runs';
import Spinner from '../../components/shared/spinner/Spinner';

function RightPanel() {
  const {
    data: runningPools,
    isLoading: isLoadingRunningPools,
    error: runningPoolsError,
  } = useGetAllRunningPools();

  if (isLoadingRunningPools) {
    return <Spinner label="Loading active runs..." />;
  }
  if (runningPoolsError) {
    return <Result status="error" title="Error: Failed to fetch active runs" />;
  }

  return (
    <aside style={styles.container}>
      <h3>Running pools</h3>
      {runningPools?.runningPools.map((runningPool) => (
        <RunningPool key={runningPool.poolRunId} runningPool={runningPool} />
      ))}
    </aside>
  );
}

export default RightPanel;
