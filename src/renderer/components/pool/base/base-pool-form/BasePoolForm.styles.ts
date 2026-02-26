import { theme } from '../../../../theme';

export interface IBasePoolFormStyles {
  section: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  column: React.CSSProperties;
  inputGroup: React.CSSProperties;
  label: React.CSSProperties;
  checkboxGroup: React.CSSProperties;
  checkboxLabel: React.CSSProperties;
  statsContainer: React.CSSProperties;
}

export const basePoolFormStyles: IBasePoolFormStyles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.sm,
  },
  column: {
    display: 'flex',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    flex: 1,
    minWidth: '200px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.colors.text.secondary,
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: theme.colors.text.primary,
  },
  statsContainer: {
    fontSize: '14px',
    color: theme.colors.text.secondary,
  },
};
