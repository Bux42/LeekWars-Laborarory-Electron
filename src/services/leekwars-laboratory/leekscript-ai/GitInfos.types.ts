export interface IGitInfos {
  gitRepoUrl: string;
  gitCommitHash: string;
  hasUncommittedChanges: boolean;
  gitDiffOutput: string;
}
