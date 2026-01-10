import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';

export const usePoolRunDuel = (id: string, refetchInterval?: number) => {
  const { poolRunDuelService } = useServerContext();

  return useQuery({
    queryKey: ['poolRunDuel', id],
    queryFn: () => poolRunDuelService.getPoolRunDuelById(id),
    enabled: !!id,
    select: (data) => data.poolRunDuel,
    refetchInterval,
  });
};
