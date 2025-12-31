import React from 'react';
import { headerStyles as styles } from './Header.styles';

const Header: React.FC = () => {
  return (
    <header style={styles.container}>
      <h2>LeekWars Laboratory</h2>
    </header>
  );
};

export default Header;
