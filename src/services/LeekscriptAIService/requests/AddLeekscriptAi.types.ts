export interface IAddLeekscriptAiRequest {
  aiFilePath: string;
  name: string;
  description?: string;
}

export interface IAddLeekscriptAiResponse {
  mergedCodeHash: string;
  success: boolean;
  message?: string;
}
