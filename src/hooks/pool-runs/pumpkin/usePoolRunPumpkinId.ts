import { useParams } from 'react-router-dom';

export const usePoolRunPumpkinId = () => {
  const { runId } = useParams<{ runId: string }>();
  return runId || '';
};
