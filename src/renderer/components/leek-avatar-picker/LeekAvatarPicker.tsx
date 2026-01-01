import React, { useState } from 'react';
import { leekAvatarPickerStyles as styles } from './LeekAvatarPicker.styles';
import { ILeekAvatarPickerProps } from './LeekAvatarPicker.types';
import { ALL_AVATAR_NAMES } from './LeekAvatarPicker.constants';
import { getImage } from '../../utils/ImageLoader';
import Button from '../shared/button/Button';

const DEFAULT_AVATAR = 'leek1_front_green';

function LeekAvatarPicker({
  level,
  selectedAvatar = DEFAULT_AVATAR,
  onChange,
}: ILeekAvatarPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarSelect = (avatar: string) => {
    onChange(avatar);
    setIsModalOpen(false);
  };

  const currentAvatarSrc = getImage(`leekwars/image/leek/${selectedAvatar}`);

  return (
    <>
      <button
        type="button"
        style={styles.button}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = styles.button
            .backgroundColor as string;
          e.currentTarget.style.borderColor = '#4e4e4e';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = styles.button.border as string;
        }}
      >
        <img
          src={currentAvatarSrc}
          alt="Selected avatar"
          style={styles.avatarPreview}
        />
        <span>Change Avatar</span>
      </button>

      {isModalOpen && (
        <div
          style={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsModalOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        >
          <div style={styles.modalContent} role="dialog" aria-modal="true">
            <div style={styles.modalHeader}>
              <h2>Select Avatar (Level {level})</h2>
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Close
              </Button>
            </div>

            <div style={styles.avatarGrid}>
              {ALL_AVATAR_NAMES.map((avatar) => {
                const isSelected = avatar === selectedAvatar;
                return (
                  <div
                    key={avatar}
                    style={
                      isSelected ? styles.avatarItemSelected : styles.avatarItem
                    }
                    onClick={() => handleAvatarSelect(avatar)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleAvatarSelect(avatar)
                    }
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${avatar}`}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#4e4e4e';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = styles.avatarItem
                          .border as string;
                      }
                    }}
                  >
                    <img
                      src={getImage(`leekwars/image/leek/${avatar}`)}
                      alt={avatar}
                      style={styles.avatarImage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeekAvatarPicker;
