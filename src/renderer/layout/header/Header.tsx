import React from 'react';
import { headerStyles as styles } from './Header.styles';
import ServerStatus from '../../components/server-status/ServerStatus';
import Breadcrumbs from './Breadcrumbs';

function Header() {
  return (
    <header style={{ ...styles.container, gap: '20px' }}>
      <h2 style={{ whiteSpace: 'nowrap', margin: 0, fontSize: '1.2rem' }}>
        LeekWars Laboratory
      </h2>
      <Breadcrumbs />
      <ServerStatus />
    </header>
  );
}

export default Header;
