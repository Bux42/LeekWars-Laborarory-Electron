import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useDeleteLeek = () => {
  const { leekService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leekService.deleteLeek({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leeks'] });
    },
  });
};
