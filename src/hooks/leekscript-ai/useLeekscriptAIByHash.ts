import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeekscriptAIByHash = (mergedCodeHash: string) => {
  const { leekscriptAIService } = useServerContext();

  return useQuery({
    queryKey: ['leekscriptAI', mergedCodeHash],
    queryFn: () => leekscriptAIService.getByMergedCodeHash(mergedCodeHash),
    enabled: !!mergedCodeHash,
    select: (data) => data.codeSnapshot,
  });
};
