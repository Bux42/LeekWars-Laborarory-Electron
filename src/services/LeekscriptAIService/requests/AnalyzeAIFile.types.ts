export interface IAnalyzeAIFileRequest {
  aiFilePath: string;
}

export interface IAnalyzeAIFileResponse {
  success: boolean;
  errorCount?: number;
}
