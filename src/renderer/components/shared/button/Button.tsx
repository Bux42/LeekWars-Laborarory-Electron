import React from 'react';
import { buttonStyles as styles } from './Button.styles';
import { IButtonProps } from './Button.types';

function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
}: IButtonProps) {
  const variantStyle = styles[variant];
  const combinedStyle = {
    ...styles.base,
    ...variantStyle,
    ...(disabled ? styles.disabled : {}),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={combinedStyle}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
