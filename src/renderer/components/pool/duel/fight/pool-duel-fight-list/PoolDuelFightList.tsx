import { useGetApiFightDuelGetByPoolRunIdId } from '../../../../../../services/duel-fights/duel-fights';
import PoolDuelFightCard from '../pool-duel-fight-card/PoolDuelFightCard';
import { IPoolDuelFightListProps } from './PoolDuelFightList.types';

function PoolDuelFightList({ poolDuelId, leeks }: IPoolDuelFightListProps) {
  const { data, isLoading, error } =
    useGetApiFightDuelGetByPoolRunIdId(poolDuelId);
  console.log('Fights data:', data);

  if (isLoading) {
    return <div>Loading fights...</div>;
  }

  if (error) {
    return <div>Error loading fights: {error.message}</div>;
  }

  if (!data || data.fights.length === 0) {
    return <div>No fights found for this pool duel.</div>;
  }

  // TODO: pagination

  return (
    <div>
      {data.fights.map((fight) => {
        const leek1 = leeks.find((leek) => leek.id === fight.leek1Id);
        const leek2 = leeks.find((leek) => leek.id === fight.leek2Id);

        console.log('leek1:', leek1);
        console.log('leek2:', leek2);
        return (
          <PoolDuelFightCard
            key={fight.id}
            fight={fight}
            leek1={leeks.find((leek) => leek.id === fight.leek1Id)!}
            leek2={leeks.find((leek) => leek.id === fight.leek2Id)!}
          />
        );
      })}
    </div>
  );
}

export default PoolDuelFightList;
