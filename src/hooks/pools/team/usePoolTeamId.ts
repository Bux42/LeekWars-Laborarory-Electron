import { useParams } from 'react-router-dom';

export const usePoolTeamId = () => {
  const { poolId } = useParams<{ poolId: string }>();
  return poolId || '';
};
