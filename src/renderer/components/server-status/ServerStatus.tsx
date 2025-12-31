import React, { useEffect, useState } from 'react';
import { serverStatusStyles as styles } from './ServerStatus.styles';
import { useServerContext } from '../../../context/server/ServerContext';
import Button from '../shared/button/Button';
import Input from '../shared/input/Input';
import { theme } from '../../theme';

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
    backgroundColor: isServerRunning
      ? theme.colors.accent.success
      : theme.colors.accent.error,
  };

  return (
    <div style={styles.container}>
      <div style={statusIndicatorStyle} />
      <span style={styles.status}>
        {isServerRunning ? 'Running' : 'Stopped'}
      </span>
      {isEditing ? (
        <>
          <Input
            type="number"
            value={portInput}
            onChange={setPortInput}
            placeholder="Port"
          />
          <Button onClick={handleSavePort} variant="primary">
            Save
          </Button>
          <Button
            onClick={() => {
              setIsEditing(false);
              setPortInput(port.toString());
            }}
            variant="secondary"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <span style={styles.status}>Port: {port}</span>
          <Button onClick={() => setIsEditing(true)} variant="primary">
            Configure
          </Button>
        </>
      )}
    </div>
  );
}

export default ServerStatus;
