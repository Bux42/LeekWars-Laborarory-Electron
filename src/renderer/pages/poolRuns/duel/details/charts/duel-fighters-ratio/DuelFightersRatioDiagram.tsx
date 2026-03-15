import { useMemo, useState } from 'react';
import { useGetFightDuelFightersRatioPoolRunId } from '../../../../../../../services/duel-fights/duel-fights';
import { RatioType } from '../../../../../../constants/pools/Pools.constants';
import { IDuelFightersRatioDiagramProps } from './DuelFightersRatioDiagram.types';
import { IChordDiagramNode } from '../../../../../../components/charts/chord-diagram/ChordDiagram.types';

function DuelFightersRatioDiagram({
  poolRunId,
}: IDuelFightersRatioDiagramProps) {
  const [ratioType, setRatioType] = useState<RatioType>('wins');

  const {
    data: fightersRatioData,
    isLoading: fightersRatioLoading,
    error: fightersRatioError,
  } = useGetFightDuelFightersRatioPoolRunId(poolRunId);

  const nodes: IChordDiagramNode[] = useMemo(() => {
    if (!fightersRatioData) return [];
    return fightersRatioData.map((item) => ({
      id: item.leekId.toString(),
      label: item.leekName,
    }));
  }, [fightersRatioData]);

  return <div>DuelFightersRatioDiagram</div>;
}

export default DuelFightersRatioDiagram;
