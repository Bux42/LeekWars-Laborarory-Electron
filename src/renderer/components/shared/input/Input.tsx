import React from 'react';
import { inputStyles as styles } from './Input.styles';
import { IInputProps } from './Input.types';
import { theme } from '../../../theme';

function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
}: IInputProps) {
  const combinedStyle = {
    ...styles.input,
    ...(disabled ? styles.disabled : {}),
  };

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={combinedStyle}
      onFocus={(e) => {
        e.target.style.borderColor = theme.colors.border.focus;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = theme.colors.border.primary;
      }}
    />
  );
}

export default Input;
