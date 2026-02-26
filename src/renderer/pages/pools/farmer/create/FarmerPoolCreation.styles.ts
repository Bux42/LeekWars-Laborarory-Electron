import { theme } from '../../../../theme';

export const farmerPoolCreationStyles = {
  content: {
    overflowY: 'auto' as const,
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: theme.spacing.xl,
    color: theme.colors.text.primary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.xl,
    width: '100%',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
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
  selectedFarmersContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    minHeight: '40px',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.sm,
    border: `1px dashed ${theme.colors.border.secondary}`,
  },
  selectedFarmerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.primary}`,
  },
  selectedFarmerName: {
    color: theme.colors.text.primary,
    fontSize: '14px',
    fontFamily: theme.fonts.primary,
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  error: {
    color: theme.colors.accent.error,
    marginTop: theme.spacing.md,
  },
  noFarmerSelected: {
    color: theme.colors.text.secondary,
    fontSize: '12px',
    fontFamily: theme.fonts.primary,
  },
};
