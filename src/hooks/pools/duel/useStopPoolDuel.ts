import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';
import { IStopPoolDuelRequest } from '../../../services/PoolDuelService/requests/StopPoolDuel.types';

export const useStopPoolDuel = () => {
  const { poolDuelService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IStopPoolDuelRequest) =>
      poolDuelService.stopPool(params),
    onSuccess: () => {
      // Invalidate pool duels and runs queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['poolDuels'] });
      queryClient.invalidateQueries({ queryKey: ['poolRunDuel'] });
      queryClient.invalidateQueries({ queryKey: ['poolRunDuels'] });
    },
  });
};
