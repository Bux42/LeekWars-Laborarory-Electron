import { useParams } from 'react-router-dom';

export const usePoolDuelId = () => {
  const { poolId } = useParams<{ poolId: string }>();
  return poolId;
};
