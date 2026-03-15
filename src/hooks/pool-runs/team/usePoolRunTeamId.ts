import { useParams } from 'react-router-dom';

export const usePoolRunTeamId = () => {
  const { runId } = useParams<{ runId: string }>();
  return runId || '';
};
