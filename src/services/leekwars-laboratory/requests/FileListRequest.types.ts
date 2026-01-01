export interface IFileListItem {
  directory: boolean;
  name: string;
  path: string;
}

export interface IFileListRequest {
  directory_path?: string;
}

export interface IFileListResponse {
  files: IFileListItem[];
}
