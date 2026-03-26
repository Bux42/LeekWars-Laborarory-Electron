import { useParams } from 'react-router-dom';

export const usePoolPumpkinId = () => {
  const { poolId } = useParams<{ poolId: string }>();
  return poolId || '';
};
