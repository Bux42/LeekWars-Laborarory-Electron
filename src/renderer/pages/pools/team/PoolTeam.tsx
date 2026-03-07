import { useNavigate } from 'react-router-dom';
import { poolsStyles as styles } from '../Pools.styles';
import Button from '../../../components/shared/button/Button';

function PoolTeam() {
  const navigate = useNavigate();

  // const { data, isLoading, error } = useGetTeamPoolsAll({
  //   query: {
  //     queryKey: ['teamPools'],
  //   },
  // });

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Team Pools</h2>
        <Button
          onClick={() => navigate('/pools/team/create')}
          variant="primary"
        >
          Add Pool
        </Button>
      </div>

      {/* {isLoading && <p style={styles.loadingText}>Loading pools...</p>}
      {!!error && <p style={styles.errorText}>Error: Failed to fetch pools</p>}
      {!isLoading && !error && (
        <BasePoolList
          pools={data?.teamPools || []}
          getLabel={(pool) => `${pool.teamMembers.length} team members`}
          onActionClick={(pool) => navigate(`/pools/team/${pool.id}`)}
          emptyMessage="No team pools found."
        />
      )} */}
    </div>
  );
}

export default PoolTeam;
