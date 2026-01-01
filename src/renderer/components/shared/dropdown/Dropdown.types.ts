export interface IDropdownItem {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export interface IDropdownProps {
  items: IDropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  buttonContent?: React.ReactNode;
}
