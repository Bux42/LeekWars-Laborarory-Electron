import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const usePoolDuels = () => {
  const { poolDuelService } = useServerContext();

  return useQuery({
    queryKey: ['poolDuels'],
    queryFn: () => poolDuelService.getPoolDuels(),
    select: (data) => data.pools,
  });
};
