import React from 'react';
import { IGitInfosProps } from './GitInfos.types';
import styles from './GitInfos.styles';

function GitInfos({ gitInfos }: IGitInfosProps) {
  const getCommitUrl = () => {
    if (!gitInfos?.repoUrl || !gitInfos.commitHash) return null;

    if (gitInfos.repoUrl.includes('github.com')) {
      let baseUrl = gitInfos.repoUrl;
      if (baseUrl.endsWith('.git')) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 4);
      }
      return `${baseUrl}/commit/${gitInfos.commitHash}`;
    }

    return null;
  };

  const commitUrl = getCommitUrl();

  return (
    <div style={styles.container}>
      <div style={styles.title}>Git Information</div>
      <div style={styles.infoGrid}>
        <span style={styles.label}>Repository</span>
        {gitInfos?.repoUrl ? (
          <a
            href={gitInfos.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {gitInfos.repoUrl}
          </a>
        ) : (
          <span style={styles.value}>N/A</span>
        )}

        <span style={styles.label}>Commit Hash</span>
        {commitUrl ? (
          <a
            href={commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {gitInfos.commitHash}
          </a>
        ) : (
          <span style={styles.value}>{gitInfos?.commitHash || 'N/A'}</span>
        )}

        <span style={styles.label}>Branch Name</span>
        <span style={styles.value}>{gitInfos?.branchName || 'N/A'}</span>

        <span style={styles.label}>Main File</span>
        <span style={styles.value}>
          {gitInfos?.mainFileRelativePath || 'N/A'}
        </span>
      </div>
    </div>
  );
}

export default GitInfos;
