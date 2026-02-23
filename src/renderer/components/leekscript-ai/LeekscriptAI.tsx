import React from 'react';
import { ILeekscriptAIProps } from './LeekscriptAI.types';
import styles from './LeekscriptAI.styles';
import GitInfos from './git-infos/GitInfos';

function LeekscriptAI({ leekscriptAI }: ILeekscriptAIProps) {
  return (
    <div
      style={styles.container}
      id={leekscriptAI.id ? `leekscript-ai-${leekscriptAI.id}` : undefined}
    >
      <div>
        <h3 style={styles.mainTitle}>{leekscriptAI.name ?? 'Unnamed AI'}</h3>
        <div style={styles.metadataContainer}>
          <div style={{ ...styles.metadataItem, gridColumn: '1 / -1' }}>
            <span style={styles.label}>Description</span>
            <span style={styles.value}>
              {leekscriptAI.description || 'No description provided.'}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Git Information</h3>
        <GitInfos gitInfos={leekscriptAI.gitInfos} />
      </div>
    </div>
  );
}

export default LeekscriptAI;
