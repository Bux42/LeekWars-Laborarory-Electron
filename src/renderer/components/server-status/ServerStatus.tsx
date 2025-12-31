import React from 'react';
import { serverStatusStyles as styles } from './ServerStatus.styles';
import { IServerStatusProps } from './ServerStatus.types';

function ServerStatus({ port = 3000 }: IServerStatusProps) {
  return (
    <div style={styles.container}>
      <div style={styles.statusIndicator} />
      <span style={styles.status}>Server Status (Port {port})</span>
    </div>
  );
}

export default ServerStatus;
