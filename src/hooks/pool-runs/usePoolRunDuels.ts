import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const usePoolRunDuels = () => {
  const { poolRunDuelService } = useServerContext();

  return useQuery({
    queryKey: ['poolRunDuels'],
    queryFn: () => poolRunDuelService.getPoolRunDuels(),
    select: (data) => data.poolRunDuels,
  });
};
