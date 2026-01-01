import React, { useEffect, useRef } from 'react';
import { dropdownStyles as styles } from './Dropdown.styles';
import { IDropdownProps } from './Dropdown.types';
import { theme } from '../../../theme';

function Dropdown({
  items,
  isOpen,
  onToggle,
  buttonContent = '⋮',
}: IDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, onClick: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <button
        style={styles.button}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        type="button"
        aria-label="Actions menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {buttonContent}
      </button>
      {isOpen && (
        <div style={styles.menu} role="menu">
          {items.map((item) => (
            <div
              key={item.label}
              style={
                item.variant === 'danger'
                  ? styles.menuItemDanger
                  : styles.menuItem
              }
              onClick={() => {
                item.onClick();
                onToggle();
              }}
              onKeyDown={(e) =>
                handleItemKeyDown(e, () => {
                  item.onClick();
                  onToggle();
                })
              }
              role="menuitem"
              tabIndex={0}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  item.variant === 'danger'
                    ? theme.colors.accent.error
                    : theme.colors.background.tertiary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
