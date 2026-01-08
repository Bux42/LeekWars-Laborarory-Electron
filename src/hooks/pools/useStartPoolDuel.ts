import { useMutation } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';
import { IStartPoolDuelRequest } from '../../services/PoolDuelService/requests/StartPoolDuel.types';

export const useStartPoolDuel = () => {
  const { poolDuelService } = useServerContext();

  return useMutation({
    mutationFn: (params: IStartPoolDuelRequest) =>
      poolDuelService.startPoolDuel(params),
    onSuccess: (data) => {
      console.log('Pool duel started successfully. Run ID:', data.run_id);
    },
  });
};
