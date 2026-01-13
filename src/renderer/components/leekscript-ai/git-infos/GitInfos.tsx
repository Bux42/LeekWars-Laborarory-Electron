import React, { useMemo } from 'react';
import Anser from 'anser';
import { IGitInfosProps } from './GitInfos.types';
import { gitInfosStyles as styles } from './GitInfos.styles';
import { useLeekscriptGitDiff } from '../../../../hooks/leekscript-ai/useLeekscriptGitDiff';
import Spinner from '../../shared/spinner/Spinner';

const GitInfos: React.FC<IGitInfosProps> = ({ gitInfos, mergedCodeHash }) => {
  const { data: remoteDiff, isLoading } = useLeekscriptGitDiff(
    mergedCodeHash || '',
  );

  const diffToDisplay = remoteDiff ?? gitInfos.diffOutput;

  const getCommitUrl = () => {
    if (!gitInfos.repoUrl || !gitInfos.commitHash) return null;

    // Check if it's a github repo
    if (gitInfos.repoUrl.includes('github.com')) {
      let baseUrl = gitInfos.repoUrl;
      // Remove trailing .git if present
      if (baseUrl.endsWith('.git')) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 4);
      }
      return `${baseUrl}/commit/${gitInfos.commitHash}`;
    }

    return null;
  };

  const commitUrl = getCommitUrl();

  const renderedDiff = useMemo(() => {
    if (!diffToDisplay) return null;
    return Anser.ansiToHtml(diffToDisplay, { use_classes: false });
  }, [diffToDisplay]);

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
        <a
          href={gitInfos.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          {gitInfos.repoUrl}
        </a>

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
          <span style={styles.value}>{gitInfos.commitHash}</span>
        )}
        <span style={styles.label}>Branch Name</span>
        <span style={styles.value}>{gitInfos.branchName}</span>
      </div>

      {(isLoading || diffToDisplay) && (
        <div style={styles.diffContainer}>
          <div style={styles.label}>Uncommitted Changes Diff</div>
          {isLoading ? (
            <Spinner size="small" label="Loading diff..." />
          ) : (
            <pre
              style={styles.diffCode}
              dangerouslySetInnerHTML={{ __html: renderedDiff || '' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GitInfos;
