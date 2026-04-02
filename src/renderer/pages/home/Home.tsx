import React from 'react';
import Button from '../../components/shared/button/Button';
import { homeStyles as styles } from './Home.styles';

function Home() {
  const handleTestNotification = () => {
    window.electron.ipcRenderer.sendMessage('app:show-notification', {
      title: 'LeekWars Laboratory',
      body: 'This is a test notification from Home page.',
    });
  };

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Home</h1>
      <Button onClick={handleTestNotification}>Send Test Notification</Button>
    </div>
  );
}

export default Home;
