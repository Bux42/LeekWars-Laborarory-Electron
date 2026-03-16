import { useMemo } from 'react';
import { Result } from 'antd';
import { usePoolRunDuelId } from '../../../../../../hooks/pool-runs/duel/usePoolRunDuelId';
import { useGetFightDuelFightersRatioPoolRunId } from '../../../../../../services/duel-fights/duel-fights';
import Spinner from '../../../../../components/shared/spinner/Spinner';
import MatrixHeatmapChart from '../../../../../components/charts/matrix-heatmap/MatrixHeatmapChart';
import { IMatrixHeatmapPair } from '../../../../../components/charts/matrix-heatmap/MatrixHeatmapChart.types';
import { IDuelMatrixChartProps } from './DuelMatrixChart.types';
import LeekDetail from '../../../../../components/leek/leek-detail/LeekDetail';
import LeekComparison from './leek-comparison/LeekComparison';

function DuelMatrixChart({ leeks }: IDuelMatrixChartProps) {
  const runId = usePoolRunDuelId();

  const { data, isLoading, error } =
    useGetFightDuelFightersRatioPoolRunId(runId);

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
    const entity = leeks.find((e) => e.id === entityId);
    if (!entity) return <div>Entity not found</div>;
    return <LeekDetail leek={entity} />;
  };

  const onHoverPairElement = (fromId: string, toId: string, value: number) => {
    const leek1 = leeks.find((e) => e.id === fromId);
    const leek2 = leeks.find((e) => e.id === toId);

    if (!leek1 || !leek2) return <div>Leek not found</div>;

    return <LeekComparison leek1={leek1} leek2={leek2} value={value} />;
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

export default DuelMatrixChart;
