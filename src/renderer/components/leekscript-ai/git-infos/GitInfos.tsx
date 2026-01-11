import React from 'react';
import { IGitInfosProps } from './GitInfos.types';
import { gitInfosStyles as styles } from './GitInfos.styles';

const GitInfos: React.FC<IGitInfosProps> = ({ gitInfos }) => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>
        Git Information
        <span style={styles.badge(gitInfos.hasUncommittedChanges)}>
          {gitInfos.hasUncommittedChanges ? 'Dirty' : 'Clean'}
        </span>
      </div>
      <div style={styles.infoGrid}>
        <span style={styles.label}>Repository</span>
        <span style={styles.value}>{gitInfos.gitRepoUrl}</span>

        <span style={styles.label}>Commit Hash</span>
        <span style={styles.value}>{gitInfos.gitCommitHash}</span>
      </div>

      {gitInfos.gitDiffOutput && (
        <div style={styles.diffContainer}>
          <div style={styles.label}>Uncommitted Changes Diff</div>
          <pre style={styles.diffCode}>{gitInfos.gitDiffOutput}</pre>
        </div>
      )}
    </div>
  );
};

export default GitInfos;
