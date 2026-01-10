import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';
import { IUpdatePoolDuelRequest } from '../../../services/PoolDuelService/requests/UpdatePoolDuel.types';

export const useUpdatePoolDuel = () => {
  const { poolDuelService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IUpdatePoolDuelRequest) =>
      poolDuelService.updatePoolDuel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poolDuels'] });
    },
  });
};
