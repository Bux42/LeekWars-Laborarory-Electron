import { theme } from '../../../theme';

export interface IToggleStyles {
  container: React.CSSProperties;
  label: React.CSSProperties;
  labelDisabled: React.CSSProperties;
  toggleWrapper: React.CSSProperties;
  toggleWrapperDisabled: React.CSSProperties;
  toggleTrack: React.CSSProperties;
  toggleTrackChecked: React.CSSProperties;
  toggleThumb: React.CSSProperties;
  toggleThumbChecked: React.CSSProperties;
}

export const toggleStyles: IToggleStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    cursor: 'pointer',
    userSelect: 'none',
  },
  labelDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  toggleWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: '44px',
    height: '24px',
    cursor: 'pointer',
  },
  toggleWrapperDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  toggleTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.border.primary,
    borderRadius: '12px',
    transition: 'background-color 0.2s ease',
  },
  toggleTrackChecked: {
    backgroundColor: theme.colors.accent.primary,
  },
  toggleThumb: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: theme.colors.text.primary,
    borderRadius: '50%',
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  toggleThumbChecked: {
    transform: 'translateX(20px)',
  },
};
