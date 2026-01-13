import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useLeekscriptGitDiff = (mergedCodeHash: string) => {
  const { leekscriptAIService } = useServerContext();

  return useQuery({
    queryKey: ['leekscriptGitDiff', mergedCodeHash],
    queryFn: () =>
      leekscriptAIService.getGitDiffByMergedCodeHash(mergedCodeHash),
    enabled: !!mergedCodeHash,
  });
};
