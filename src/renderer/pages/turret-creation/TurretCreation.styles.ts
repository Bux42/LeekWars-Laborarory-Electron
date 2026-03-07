import { theme } from '../../theme';

export interface TurretCreationStyles {
  section: React.CSSProperties;
  successMessage: React.CSSProperties;
  error: React.CSSProperties;
}

export const turretCreationStyles: TurretCreationStyles = {
  section: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  successMessage: {
    color: '#4BB543',
    fontWeight: 'bold',
  },
  error: {
    color: '#FF3333',
    fontWeight: 'bold',
  },
};
