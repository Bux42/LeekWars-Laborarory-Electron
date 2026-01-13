export interface IInputProps {
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'password' | 'email';
  placeholder?: string;
  disabled?: boolean;
}
