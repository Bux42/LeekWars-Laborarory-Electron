import { useParams } from 'react-router-dom';

export const usePoolFarmerId = () => {
  const { poolId } = useParams<{ poolId: string }>();
  return poolId;
};
