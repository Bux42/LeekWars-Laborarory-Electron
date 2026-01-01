import { IFileListItem } from '../../../services/leekwars-laboratory/requests/FileListRequest.types';

export interface IFileBrowserProps {
  onFileSelect: (file: IFileListItem) => void;
  selectedFile: IFileListItem | null;
}
