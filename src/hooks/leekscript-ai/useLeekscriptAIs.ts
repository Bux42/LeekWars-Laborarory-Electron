import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeekscriptAIs = (removeCode?: boolean) => {
  const { leekscriptAIService } = useServerContext();

  return useQuery({
    queryKey: ['leekscriptAIs', removeCode],
    queryFn: () => leekscriptAIService.getAllLeekscriptAis({ removeCode }),
    select: (data) => data.leekscriptAis,
  });
};
