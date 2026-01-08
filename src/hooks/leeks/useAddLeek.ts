import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';
import { IAddLeekRequest } from '../../services/LeekService/requests/AddLeek.types';

export const useAddLeek = () => {
  const { leekService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IAddLeekRequest) => leekService.addLeek(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leeks'] });
    },
  });
};
