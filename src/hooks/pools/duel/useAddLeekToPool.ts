import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';
import { IAddLeekToPoolRequest } from '../../../services/PoolDuelService/requests/AddLeekToPool.types';

export const useAddLeekToPool = () => {
  const { poolDuelService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IAddLeekToPoolRequest) =>
      poolDuelService.addLeekToPool(params),
    onSuccess: () => {
      // Invalidate pool duels queries to refresh the list/detail
      queryClient.invalidateQueries({ queryKey: ['poolDuels'] });
    },
  });
};
