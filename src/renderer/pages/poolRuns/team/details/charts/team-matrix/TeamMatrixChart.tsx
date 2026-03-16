import { useMemo } from 'react';
import { Result } from 'antd';
import { IMatrixHeatmapPair } from '../../../../../../components/charts/matrix-heatmap/MatrixHeatmapChart.types';
import { ITeamMatrixChartProps } from './TeamMatrixChart.types';
import Spinner from '../../../../../../components/shared/spinner/Spinner';
import MatrixHeatmapChart from '../../../../../../components/charts/matrix-heatmap/MatrixHeatmapChart';
import TeamCard from '../../../../../../components/team/team-card/TeamCard';
import TeamComparison from './team-comparison/TeamComparison';
import { useGetFightTeamFightersRatioPoolRunId } from '../../../../../../../services/team-fights/team-fights';
import { usePoolRunTeamId } from '../../../../../../../hooks/pool-runs/team/usePoolRunTeamId';
import { PoolTeamResponseToTeamResponse } from '../../../../../../mappers/TeamMapper';

function TeamMatrixChart({ teams }: ITeamMatrixChartProps) {
  const runId = usePoolRunTeamId();

  const { data, isLoading, error } =
    useGetFightTeamFightersRatioPoolRunId(runId);

  const chartData: IMatrixHeatmapPair[] = useMemo(() => {
    if (!data || !data.pairs) return [];

    const chartDataConverted: IMatrixHeatmapPair[] = data.pairs.map((pair) => ({
      from: {
        id: pair.from.id,
        label: pair.from.label,
      },
      to: {
        id: pair.to.id,
        label: pair.to.label,
      },
      value: pair.value,
    }));

    const chartDataInverted: IMatrixHeatmapPair[] = data.pairs.map((pair) => ({
      from: {
        id: pair.to.id,
        label: pair.to.label,
      },
      to: {
        id: pair.from.id,
        label: pair.from.label,
      },
      value: 100 - pair.value, // Assuming value is a win ratio, invert it for the opposite direction
    }));

    return [...chartDataConverted, ...chartDataInverted];
  }, [data]);

  const onHoverEntityElement = (entityId: string) => {
    const entity = teams.find((e) => e.id === entityId);
    if (!entity) return <div>Entity not found</div>;
    return (
      <div style={{ minWidth: 600 }}>
        <TeamCard
          showDeleteButton={false}
          team={PoolTeamResponseToTeamResponse(entity)}
        />
      </div>
    );
  };

  const onHoverPairElement = (fromId: string, toId: string, value: number) => {
    const team1 = teams.find((e) => e.id === fromId);
    const team2 = teams.find((e) => e.id === toId);

    if (!team1 || !team2) return <div>Team not found</div>;

    return <TeamComparison team1={team1} team2={team2} value={value} />;
  };

  if (isLoading) {
    return <Spinner label="Loading fighters ratios..." />;
  }

  if (error) {
    return (
      <Result status="error" title="Error: Failed to fetch fighters ratios" />
    );
  }

  return (
    <MatrixHeatmapChart
      pairs={chartData}
      title="Winrate"
      onHoverEntityElement={onHoverEntityElement}
      onHoverPairElement={onHoverPairElement}
    />
  );
}

export default TeamMatrixChart;
