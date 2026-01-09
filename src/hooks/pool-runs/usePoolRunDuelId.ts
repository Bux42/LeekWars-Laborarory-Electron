import { useParams } from 'react-router-dom';

export const usePoolRunDuelId = () => {
  const { runId } = useParams<{ runId: string }>();
  return runId;
};
