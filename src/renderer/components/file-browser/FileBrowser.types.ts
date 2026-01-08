import { IFileListItem } from '../../../services/FileService/requests/FileList.types';

export interface IFileBrowserProps {
  onFileSelect: (file: IFileListItem) => void;
  selectedFile: IFileListItem | null;
}
