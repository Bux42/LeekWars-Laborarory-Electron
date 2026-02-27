import { useParams } from 'react-router-dom';

export const usePoolRunFarmerId = () => {
  const { runId } = useParams<{ runId: string }>();
  return runId;
};
