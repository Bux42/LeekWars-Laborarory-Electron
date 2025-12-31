import React from 'react';
import { layoutStyles as styles } from './Layout.styles';
import { ILayoutProps } from './Layout.types';
import { ServerProvider } from '../../context/server/ServerContext';
import Header from './header/Header';
import LeftPanel from './left-panel/LeftPanel';
import RightPanel from './right-panel/RightPanel';
import Body from './body/Body';

function Layout({ children }: ILayoutProps) {
  return (
    <ServerProvider>
      <div style={styles.container}>
        <Header />
        <div style={styles.mainContent}>
          <LeftPanel />
          <Body>{children}</Body>
          <RightPanel />
        </div>
      </div>
    </ServerProvider>
  );
}

export default Layout;
