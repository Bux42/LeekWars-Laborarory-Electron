import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeekscriptAIs = () => {
  const { leekscriptAIService } = useServerContext();

  return useQuery({
    queryKey: ['leekscriptAIs'],
    queryFn: () => leekscriptAIService.getAllLeekscriptAis(),
    select: (data) => data.leekscriptAis,
  });
};
