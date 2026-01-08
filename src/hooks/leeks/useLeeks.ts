import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeeks = () => {
  const { leekService } = useServerContext();

  return useQuery({
    queryKey: ['leeks'],
    queryFn: () => leekService.getLeeks(),
    select: (data) => data.leeks,
  });
};
