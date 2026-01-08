import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeek = (id: string | undefined) => {
  const { leekService } = useServerContext();

  return useQuery({
    queryKey: ['leek', id],
    queryFn: () => leekService.getLeekById(id!),
    enabled: !!id,
    select: (data) => data.leek,
  });
};
