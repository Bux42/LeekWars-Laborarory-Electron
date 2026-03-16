import { useMemo } from 'react';
import { Result } from 'antd';
import { usePoolRunFarmerId } from '../../../../../../../hooks/pool-runs/farmer/usePoolRunFarmerId';
import { useGetFightFarmerFightersRatioPoolRunId } from '../../../../../../../services/farmer-fights/farmer-fights';
import { IMatrixHeatmapPair } from '../../../../../../components/charts/matrix-heatmap/MatrixHeatmapChart.types';
import { IFarmerMatrixChartProps } from './FarmerMatrixChart.types';
import Spinner from '../../../../../../components/shared/spinner/Spinner';
import MatrixHeatmapChart from '../../../../../../components/charts/matrix-heatmap/MatrixHeatmapChart';
import FarmerCard from '../../../../../../components/farmer/farmer-card/FarmerCard';
import FarmerComparison from './farmer-comparison/FarmerComparison';

function FarmerMatrixChart({ farmers }: IFarmerMatrixChartProps) {
  const runId = usePoolRunFarmerId();

  const { data, isLoading, error } =
    useGetFightFarmerFightersRatioPoolRunId(runId);

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
    const entity = farmers.find((e) => e.id === entityId);
    if (!entity) return <div>Entity not found</div>;
    return (
      <div style={{ minWidth: 600 }}>
        <FarmerCard farmer={entity} />
      </div>
    );
  };

  const onHoverPairElement = (fromId: string, toId: string, value: number) => {
    const farmer1 = farmers.find((e) => e.id === fromId);
    const farmer2 = farmers.find((e) => e.id === toId);

    if (!farmer1 || !farmer2) return <div>Farmer not found</div>;

    return (
      <FarmerComparison farmer1={farmer1} farmer2={farmer2} value={value} />
    );
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

export default FarmerMatrixChart;
