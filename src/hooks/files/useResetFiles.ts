import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useResetFiles = () => {
  const { fileService } = useServerContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fileService.resetFileDirectory(),
    onSuccess: () => {
      // Invalidate all file queries
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
