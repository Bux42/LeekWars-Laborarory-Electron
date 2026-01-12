import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';
import { IAddLeekscriptAiRequest } from '../../services/LeekscriptAIService/requests/AddLeekscriptAi.types';

export const useAddLeekscriptAI = () => {
  const { leekscriptAIService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IAddLeekscriptAiRequest) =>
      leekscriptAIService.addLeekscriptAi(params),
    onSuccess: () => {
      // Invalidate the AIs list to refresh the data
      queryClient.invalidateQueries({ queryKey: ['leekscriptAIs'] });
    },
  });
};
