import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeekscriptAIByHash = (
  mergedCodeHash: string,
  removeCode?: boolean,
) => {
  const { leekscriptAIService } = useServerContext();

  return useQuery({
    queryKey: ['leekscriptAI', mergedCodeHash, removeCode],
    queryFn: () =>
      leekscriptAIService.getByMergedCodeHash({ mergedCodeHash, removeCode }),
    enabled: !!mergedCodeHash,
    select: (data) => data.codeSnapshot,
  });
};
