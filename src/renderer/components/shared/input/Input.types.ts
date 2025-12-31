export interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'password' | 'email';
  placeholder?: string;
  disabled?: boolean;
}
