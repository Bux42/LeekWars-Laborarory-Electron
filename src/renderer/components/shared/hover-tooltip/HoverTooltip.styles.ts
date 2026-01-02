import { theme } from '../../../theme';

export interface IHoverTooltipStyles {
  container: React.CSSProperties;
  tooltip: React.CSSProperties;
}

export const hoverTooltipStyles: IHoverTooltipStyles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  tooltip: {
    backgroundColor: theme.colors.background.elevated,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    pointerEvents: 'none',
    maxWidth: '450px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
};
