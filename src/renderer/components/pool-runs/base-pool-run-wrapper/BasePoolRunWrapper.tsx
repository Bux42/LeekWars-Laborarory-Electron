import React, { useMemo } from 'react';
import { basePoolRunWrapperStyles as styles } from './BasePoolRunWrapper.styles';
import { IBasePoolRunWrapperProps } from './BasePoolRunWrapper.types';
import Spinner from '../../shared/spinner/Spinner';
import Button from '../../shared/button/Button';
import { formatDate, getDuration } from '../../../utils/DateUtils';

function BasePoolRunWrapper({
  run,
  children,
  onStop,
}: IBasePoolRunWrapperProps) {
  const [stopping, setStopping] = React.useState(false);

  const handleStop = async () => {
    if (onStop) {
      setStopping(true);
      await onStop();
      setStopping(false);
    }
  };

  const statusText = useMemo(() => {
    if (run.interrupted) return 'Interrupted';
    if (run.running) return 'Running';
    return 'Completed';
  }, [run.running, run.interrupted]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>
            Run: {run.basePool?.name || 'Unknown Pool'}
          </h2>
          <span style={styles.statusBadge(run.running, run.interrupted)}>
            {statusText}
          </span>
          {run.running && <Spinner />}
        </div>

        {run.running && onStop ? (
          <Button onClick={handleStop} variant="danger" disabled={stopping}>
            {stopping ? 'Stopping...' : 'Stop'}
          </Button>
        ) : (
          <div style={styles.label}>
            ID: <span style={{ fontFamily: 'monospace' }}>{run.id}</span>
          </div>
        )}
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>Start Time</span>
          <span style={styles.value}>{formatDate(run.startDate)}</span>
        </div>
        {!run.running && (
          <div style={styles.infoItem}>
            <span style={styles.label}>End Time</span>
            <span style={styles.value}>{formatDate(run.endDate)}</span>
          </div>
        )}
        <div style={styles.infoItem}>
          <span style={styles.label}>Duration</span>
          <span style={styles.value}>
            {getDuration(run.startDate, run.endDate)}
          </span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Status</span>
          <span style={styles.value}>
            {run.running ? 'Active execution' : 'Finished'}
          </span>
        </div>
      </div>

      {children && <div style={styles.childrenContainer}>{children}</div>}
    </div>
  );
}

export default BasePoolRunWrapper;
