import { theme } from '../../theme';

export interface ILeekAvatarPickerStyles {
  button: React.CSSProperties;
  avatarPreview: React.CSSProperties;
  modalOverlay: React.CSSProperties;
  modalContent: React.CSSProperties;
  modalHeader: React.CSSProperties;
  avatarGrid: React.CSSProperties;
  avatarItem: React.CSSProperties;
  avatarItemSelected: React.CSSProperties;
  avatarImage: React.CSSProperties;
}

export const leekAvatarPickerStyles: ILeekAvatarPickerStyles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.text.primary,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  avatarPreview: {
    width: 64,
    height: 64,
    objectFit: 'contain',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto',
    border: `1px solid ${theme.colors.border.primary}`,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: theme.spacing.md,
  },
  avatarItem: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
    border: `2px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  avatarItemSelected: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    border: `2px solid ${theme.colors.accent.primary}`,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  avatarImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
};
