import React from 'react';
import { toggleStyles as styles } from './Toggle.styles';
import { IToggleProps } from './Toggle.types';

function Toggle({ checked, onChange, disabled = false, label }: IToggleProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div style={styles.container}>
      {label && (
        <span
          style={{
            ...styles.label,
            ...(disabled ? styles.labelDisabled : {}),
          }}
          onClick={handleToggle}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          {label}
        </span>
      )}
      <div
        style={{
          ...styles.toggleWrapper,
          ...(disabled ? styles.toggleWrapperDisabled : {}),
        }}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle'}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          style={{
            ...styles.toggleTrack,
            ...(checked ? styles.toggleTrackChecked : {}),
          }}
        />
        <div
          style={{
            ...styles.toggleThumb,
            ...(checked ? styles.toggleThumbChecked : {}),
          }}
        />
      </div>
    </div>
  );
}

export default Toggle;
