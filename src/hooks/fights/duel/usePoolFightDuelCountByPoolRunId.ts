import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';

export const usePoolFightDuelCountByPoolRunId = (
  poolRunId: string,
  refetchInterval?: number,
) => {
  const { poolFightDuelService } = useServerContext();

  return useQuery({
    queryKey: ['poolFightDuelCount', poolRunId],
    queryFn: () => poolFightDuelService.getCountByPoolRunId(poolRunId),
    enabled: !!poolRunId,
    select: (data) => data.count,
    refetchInterval,
  });
};
