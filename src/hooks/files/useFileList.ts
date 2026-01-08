import { useQuery } from '@tanstack/react-query';
import { useServerContext } from '../../context/server/ServerContext';

export const useFileList = (directoryPath: string = '.') => {
  const { fileService } = useServerContext();

  return useQuery({
    queryKey: ['files', directoryPath],
    queryFn: () => fileService.getFileList({ directory_path: directoryPath }),
    select: (data) => data.files,
  });
};
