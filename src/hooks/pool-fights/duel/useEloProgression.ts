import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';

export const useEloProgression = (
  poolRunId: string,
  refetchInterval?: number,
) => {
  const { poolFightDuelService } = useServerContext();

  return useQuery({
    queryKey: ['eloProgression', poolRunId],
    queryFn: () => poolFightDuelService.getEloProgressionByPoolRunId(poolRunId),
    enabled: !!poolRunId,
    refetchInterval,
  });
};
