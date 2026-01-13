import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../../context/server/ServerContext';
import { IAddPoolDuelRequest } from '../../../services/PoolDuelService/requests/AddPoolDuel.types';

export const useAddPoolDuel = () => {
  const { poolDuelService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IAddPoolDuelRequest) =>
      poolDuelService.addPoolDuel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poolDuels'] });
    },
  });
};
