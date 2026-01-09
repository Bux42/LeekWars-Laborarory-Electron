import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPoolDuelListProps } from './PoolDuelList.types';
import { poolDuelListStyles as styles } from './PoolDuelList.styles';
import Button from '../../../shared/button/Button';
import { theme } from '../../../../theme';

const PoolDuelList: React.FC<IPoolDuelListProps> = ({ pools }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {pools.map((pool) => (
        <div
          key={pool.id}
          style={styles.item}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.colors.accent.primary;
            e.currentTarget.style.backgroundColor =
              theme.colors.background.tertiary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.colors.border.primary;
            e.currentTarget.style.backgroundColor =
              theme.colors.background.secondary;
          }}
        >
          <div style={styles.info}>
            <span style={styles.name}>{pool.name}</span>
            <span style={styles.details}>
              {pool.leekIds.length} leeks • Pool ID: {pool.id.substring(0, 8)}
              ...
            </span>
          </div>
          <div style={styles.actions}>
            <Button
              onClick={() => navigate(`/pools/duels/${pool.id}`)}
              variant="primary"
            >
              View Pool
            </Button>
          </div>
        </div>
      ))}
      {pools.length === 0 && (
        <p
          style={{
            color: theme.colors.text.tertiary,
            fontStyle: 'italic',
            textAlign: 'center',
            padding: theme.spacing.md,
          }}
        >
          No pool duels found.
        </p>
      )}
    </div>
  );
};

export default PoolDuelList;
