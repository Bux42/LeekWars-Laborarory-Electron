import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { rightPanelStyles as styles } from './RightPanel.styles';
import RunningPool from '../../components/running-pool/RunningPool';
import { useGetAllRunningPools } from '../../../services/all-pool-runs/all-pool-runs';
import Spinner from '../../components/shared/spinner/Spinner';
import { usePoolRunFinishedWs } from '../../../hooks/pool-runs/base/usePoolRunFinishedWs';
import { usePoolRunStartedWs } from '../../../hooks/pool-runs/base/usePoolRunStartedWs';
import { RunningPoolResponse } from '../../../services/leekwarsToolsAPI.schemas';

function RightPanel() {
  const navigate = useNavigate();
  const [runningPools, setRunningPools] = useState<RunningPoolResponse[]>([]);

  const {
    data: runningPoolsData,
    isLoading: isLoadingRunningPools,
    error: runningPoolsError,
  } = useGetAllRunningPools();

  useEffect(() => {
    if (runningPoolsData) {
      // only add new running pools that are not already in the state
      const newRunningPools = runningPoolsData.runningPools.filter(
        (rp) =>
          !runningPools.some(
            (existingRp) => existingRp.poolRunId === rp.poolRunId,
          ),
      );
      if (newRunningPools.length > 0) {
        setRunningPools((prev) => [...prev, ...newRunningPools]);
      }
    }
  }, [runningPoolsData, runningPools]);

  usePoolRunStartedWs((run) => {
    const addedRunningPool: RunningPoolResponse = {
      completedFights: 0,
      poolRunId: run.run.id,
      name: run.run.basePool.name,
      poolId: run.poolId,
      startTime: run.run.startDate,
      totalFights: 0,
      type: run.type,
      bossType: run.bossType,
    };

    setRunningPools((prev) => [addedRunningPool, ...prev]);
  });

  usePoolRunFinishedWs((run) => {
    // replace running pool with updated data
    setRunningPools([
      ...runningPools.map((rp) =>
        rp.poolRunId === run.run.id
          ? {
              completedFights: rp.completedFights,
              poolRunId: rp.poolRunId,
              name: rp.name,
              poolId: rp.poolId,
              startTime: rp.startTime,
              totalFights: rp.totalFights,
              type: rp.type,
              bossType: rp.bossType,
            }
          : rp,
      ),
    ]);
    const notification = new Notification('Pool finished', {
      body: `Pool run ${run.run?.basePool.name || 'Unknown Pool'} ${run.run?.id} has finished.`,
    });
    notification.onclick = () => {
      navigate(run.runRoute);
    };
  });

  const onHide = (poolRunId: string) => {
    setRunningPools((prev) => prev.filter((rp) => rp.poolRunId !== poolRunId));
  };

  if (isLoadingRunningPools) {
    return <Spinner label="Loading active runs..." />;
  }
  if (runningPoolsError) {
    return <Result status="error" title="Error: Failed to fetch active runs" />;
  }

  return (
    <aside style={styles.container}>
      <h3>Running pools</h3>
      {runningPools.map((runningPool) => (
        <RunningPool
          key={runningPool.poolRunId}
          runningPool={runningPool}
          onHide={onHide}
        />
      ))}
    </aside>
  );
}

export default RightPanel;
