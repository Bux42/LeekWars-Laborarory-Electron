import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';
import { IRemoveLeekFromPoolRequest } from '../../services/PoolDuelService/requests/RemoveLeekFromPool.types';

export const useRemoveLeekFromPool = () => {
  const { poolDuelService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IRemoveLeekFromPoolRequest) =>
      poolDuelService.removeLeekFromPool(params),
    onSuccess: () => {
      // Invalidate the pool duels query to refresh the lists
      queryClient.invalidateQueries({ queryKey: ['poolDuels'] });
    },
  });
};
