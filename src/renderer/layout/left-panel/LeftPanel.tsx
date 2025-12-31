import React from 'react';
import { leftPanelStyles as styles } from './LeftPanel.styles';

const LeftPanel: React.FC = () => {
  return (
    <aside style={styles.container}>
      <h3>Left Panel</h3>
      <p>Navigation items will go here</p>
    </aside>
  );
};

export default LeftPanel;
