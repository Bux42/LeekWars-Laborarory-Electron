export interface IGitInfos {
  repoUrl: string;
  branchName: string;
  commitHash: string;
  hasUncommittedChanges: boolean;
  diffOutput: string;
}
