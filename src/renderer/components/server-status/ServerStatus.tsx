import React, { useEffect, useState } from 'react';
import { serverStatusStyles as styles } from './ServerStatus.styles';
import { useServerContext } from '../../../context/server/ServerContext';

const STORAGE_KEY = 'leekwars-laboratory-port';

function ServerStatus() {
  const { isServerRunning, port, setPort, checkServerStatus } =
    useServerContext();
  const [portInput, setPortInput] = useState(port.toString());
  const [isEditing, setIsEditing] = useState(false);

  // Update portInput when port changes from context
  useEffect(() => {
    setPortInput(port.toString());
  }, [port]);

  // Check server status when port changes
  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 5000);
    return () => clearInterval(interval);
  }, [port, checkServerStatus]);

  const handleSavePort = () => {
    const newPort = parseInt(portInput, 10);
    if (!Number.isNaN(newPort) && newPort > 0 && newPort <= 65535) {
      setPort(newPort);
      localStorage.setItem(STORAGE_KEY, newPort.toString());
      setIsEditing(false);
    }
  };

  const statusIndicatorStyle = {
    ...styles.statusIndicator,
    backgroundColor: isServerRunning ? '#4caf50' : '#f44336',
  };

  return (
    <div style={styles.container}>
      <div style={statusIndicatorStyle} />
      <span style={styles.status}>
        {isServerRunning ? 'Running' : 'Stopped'}
      </span>
      {isEditing ? (
        <>
          <input
            type="number"
            value={portInput}
            onChange={(e) => setPortInput(e.target.value)}
            style={styles.input}
            placeholder="Port"
          />
          <button type="button" onClick={handleSavePort} style={styles.button}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setPortInput(port.toString());
            }}
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={styles.status}>Port: {port}</span>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            style={styles.button}
          >
            Configure
          </button>
        </>
      )}
    </div>
  );
}

export default ServerStatus;
