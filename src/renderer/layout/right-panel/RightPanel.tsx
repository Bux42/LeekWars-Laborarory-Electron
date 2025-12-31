import React from 'react';
import { rightPanelStyles as styles } from './RightPanel.styles';

const RightPanel: React.FC = () => {
  return (
    <aside style={styles.container}>
      <h3>Right Panel</h3>
      <p>Additional options will go here</p>
    </aside>
  );
};

export default RightPanel;
