import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const usePoolRunDuelsByPoolId = (
  poolId: string,
  refetchInterval?: number,
) => {
  const { poolRunDuelService } = useServerContext();

  return useQuery({
    queryKey: ['poolRunDuels', 'byPool', poolId],
    queryFn: () => poolRunDuelService.getPoolRunDuelsByPoolId(poolId),
    enabled: !!poolId,
    select: (data) => data.poolRunDuels,
    refetchInterval,
  });
};
