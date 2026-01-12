import { useMutation } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';
import { IAnalyzeAIFileRequest } from '../../services/LeekscriptAIService/requests/AnalyzeAIFile.types';

export const useAnalyzeAIFile = () => {
  const { leekscriptAIService } = useServerContext();

  return useMutation({
    mutationFn: (params: IAnalyzeAIFileRequest) =>
      leekscriptAIService.analyzeFile(params),
  });
};
