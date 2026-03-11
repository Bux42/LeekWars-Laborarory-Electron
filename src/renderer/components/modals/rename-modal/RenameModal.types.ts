export interface IRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (newName: string) => void;
  currentName: string;
  title: string;
  errorMessage?: string;
  confirmLoading?: boolean;
}
