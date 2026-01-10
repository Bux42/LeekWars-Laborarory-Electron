import React from 'react';
import { basePoolRunWrapperStyles as styles } from './BasePoolRunWrapper.styles';
import { IBasePoolRunWrapperProps } from './BasePoolRunWrapper.types';
import Spinner from '../../shared/spinner/Spinner';
import { formatDate, getDuration } from '../../../utils/DateUtils';

const BasePoolRunWrapper: React.FC<IBasePoolRunWrapperProps> = ({
  run,
  children,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Run: {run.pool?.name || 'Unknown Pool'}</h2>
          <span style={styles.statusBadge(run.running, run.interrupted)}>
            {run.interrupted
              ? 'Interrupted'
              : run.running
                ? 'Running'
                : 'Completed'}
          </span>
          {run.running && <Spinner />}
        </div>
        <div style={styles.label}>
          ID: <span style={{ fontFamily: 'monospace' }}>{run.id}</span>
        </div>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>Start Time</span>
          <span style={styles.value}>{formatDate(run.startTime)}</span>
        </div>
        {!run.running && (
          <div style={styles.infoItem}>
            <span style={styles.label}>End Time</span>
            <span style={styles.value}>{formatDate(run.endTime)}</span>
          </div>
        )}
        <div style={styles.infoItem}>
          <span style={styles.label}>Duration</span>
          <span style={styles.value}>
            {getDuration(run.startTime, run.endTime)}
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
};

export default BasePoolRunWrapper;
