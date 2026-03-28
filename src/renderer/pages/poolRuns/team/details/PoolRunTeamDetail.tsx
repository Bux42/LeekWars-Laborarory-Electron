import { useEffect, useMemo, useState } from 'react';
import { Result, Tabs } from 'antd';
import { usePoolRunTeamId } from '../../../../../hooks/pool-runs/team/usePoolRunTeamId';
import {
  useGetTeamPoolRunId,
  usePostTeamPoolRunIdStop,
} from '../../../../../services/team-pool-runs/team-pool-runs';
import BasePoolRunWrapper from '../../../../components/pool-runs/base-pool-run-wrapper/BasePoolRunWrapper';
import { IPoolRunBase } from '../../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import { poolsStyles as styles } from '../../../pools/Pools.styles';
import { useGetFightTeamGetCountByPoolRunIdId } from '../../../../../services/team-fights/team-fights';
import PoolTeamTeam from '../../../../components/pool/team/pool-team-team/PoolTeamTeam';
import PoolTeamFightList from '../../../../components/pool/team/fight/pool-team-fight-list/PoolTeamFightList';
import { usePoolTeamFightCountWs } from '../../../../../hooks/fights/team/usePoolTeamFightCountWs';
import { poolRunTeamDetailStyles } from './PoolRunTeamDetail.styles';
import Spinner from '../../../../components/shared/spinner/Spinner';
import TeamMatrixChart from './charts/team-matrix/TeamMatrixChart';

function PoolRunTeamDetail() {
  const poolRunId = usePoolRunTeamId();
  const [processedFights, setProcessedFights] = useState(0);

  const stopMutation = usePostTeamPoolRunIdStop();

  // useGetTeamPoolRunGetByPoolIdId
  const {
    data: teamPoolRun,
    isLoading,
    error,
  } = useGetTeamPoolRunId(poolRunId);

  const {
    data: fightCountData,
    isLoading: fightCountLoading,
    error: fightCountError,
  } = useGetFightTeamGetCountByPoolRunIdId(poolRunId);

  useEffect(() => {
    if (fightCountData) {
      setProcessedFights(fightCountData.count);
    }
  }, [fightCountData]);

  usePoolTeamFightCountWs(poolRunId || '', (count) => {
    setProcessedFights(count);
  });

  const teamsSortedByElo = useMemo(() => {
    if (!teamPoolRun || !teamPoolRun.teams) return [];
    return [...teamPoolRun.teams].sort((a, b) => b.elo - a.elo);
  }, [teamPoolRun]);

  const onStopTeamPoolRun = async () => {
    if (teamPoolRun?.id) {
      try {
        const result = await stopMutation.mutateAsync({
          id: teamPoolRun.id,
        });
        console.log('Stop result:', result);
      } catch (err) {
        console.error('Failed to stop team pool run:', err);
      }
    }
  };

  if (isLoading || fightCountLoading) {
    return <Spinner label="Loading run details..." />;
  }

  if (error || fightCountError) {
    return <Result status="error" title="Error: Failed to fetch run details" />;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Run Details</h2>
      </div>
      <BasePoolRunWrapper
        combinationsCount={teamPoolRun?.teams?.length || 0}
        processedFights={processedFights}
        run={teamPoolRun as IPoolRunBase}
        onStop={onStopTeamPoolRun}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: 'global',
              label: 'Global',
              children: <>Global</>,
            },
            {
              key: 'teams',
              label: 'Teams',
              children: (
                <div style={poolRunTeamDetailStyles.teamListContainer}>
                  {teamsSortedByElo.map((team) => (
                    <PoolTeamTeam key={team.id} team={team} />
                  ))}
                </div>
              ),
            },
            {
              key: 'charts',
              label: 'Charts',
              children: <TeamMatrixChart teams={teamPoolRun?.teams || []} />,
            },
            {
              key: 'fights',
              label: 'Fights',
              children: (
                <PoolTeamFightList
                  poolTeamId={poolRunId}
                  teams={teamPoolRun?.teams || []}
                />
              ),
            },
          ]}
        />
      </BasePoolRunWrapper>
    </>
  );
}

export default PoolRunTeamDetail;
