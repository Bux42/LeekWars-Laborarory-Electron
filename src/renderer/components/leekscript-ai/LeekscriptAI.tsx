import React from 'react';
import { ILeekscriptAIProps } from './LeekscriptAI.types';
import { leekscriptAIStyles as styles } from './LeekscriptAI.styles';
import GitInfos from './git-infos/GitInfos';
import MergedCode from './merged-code/MergedCode';
import { formatDate } from '../../utils/DateUtils';

const LeekscriptAI: React.FC<ILeekscriptAIProps> = ({ leekscriptAI }) => {
  return (
    <div style={styles.container} id={`leekscript-ai-${leekscriptAI.id}`}>
      <div>
        <h3 style={styles.mainTitle}>{leekscriptAI.name}</h3>
        <div style={styles.metadataContainer}>
          <div style={styles.metadataItem}>
            <span style={styles.label}>Creation Date</span>
            <span style={styles.value}>
              {formatDate(leekscriptAI.creationDate)}
            </span>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.label}>Original Path</span>
            <span style={{ ...styles.value, wordBreak: 'break-all' }}>
              {leekscriptAI.originalFilePath}
            </span>
          </div>
          <div style={{ ...styles.metadataItem, gridColumn: '1 / -1' }}>
            <span style={styles.label}>Description</span>
            <span style={styles.value}>{leekscriptAI.description}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Git Information</h3>
        <GitInfos
          gitInfos={leekscriptAI.gitInfos}
          mergedCodeHash={leekscriptAI.mergedCode.hash}
        />
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Source Code</h3>
        <MergedCode mergedCode={leekscriptAI.mergedCode} />
      </div>
    </div>
  );
};

export default LeekscriptAI;
