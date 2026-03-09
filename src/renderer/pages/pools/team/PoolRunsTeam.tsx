import { useNavigate } from 'react-router-dom';
import { usePoolTeamId } from '../../../../hooks/pools/team/usePoolTeamId';
import { useGetTeamPoolRunGetByPoolIdId } from '../../../../services/team-pool-runs/team-pool-runs';
import { IPoolRunBase } from '../../../../services/leekwars-laboratory/types/pool/run/PoolRunBase.types';
import Spinner from '../../../components/shared/spinner/Spinner';
import { poolsStyles as styles } from '../Pools.styles';
import PoolRunList from '../../../components/pool-runs/pool-run-list/PoolRunList';

function PoolRunsTeam() {
  const navigate = useNavigate();
  const poolId = usePoolTeamId();

  const { data, isLoading, error } = useGetTeamPoolRunGetByPoolIdId(
    poolId || '',
  );

  const handleViewRun = (run: IPoolRunBase) => {
    navigate(`/pools/team/${poolId}/runs/${run.id}`);
  };

  if (isLoading) {
    return <Spinner label="Loading pool runs..." />;
  }

  if (error) {
    return <p style={styles.errorText}>Error: Failed to fetch runs</p>;
  }

  return (
    <>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Duel Pool Runs</h2>
      </div>

      <PoolRunList runs={data?.runs || []} onViewRun={handleViewRun} />
    </>
  );
}

export default PoolRunsTeam;
