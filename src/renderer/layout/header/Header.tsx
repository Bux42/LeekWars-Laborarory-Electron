import React from 'react';
import { headerStyles as styles } from './Header.styles';
import ServerStatus from '../../components/server-status/ServerStatus';

function Header() {
  return (
    <header style={styles.container}>
      <h2>LeekWars Laboratory</h2>
      <ServerStatus />
    </header>
  );
}

export default Header;
