import React from 'react';
import { theme } from '../../../theme';

export interface IChordDiagramStyles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  svg: React.CSSProperties;
  emptyState: React.CSSProperties;
  tooltip: React.CSSProperties;
}

export const chordDiagramStyles: IChordDiagramStyles = {
  container: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    minHeight: 320,
    position: 'relative',
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: theme.fonts.primary,
  },
  svg: {
    width: '100%',
    height: '100%',
    minHeight: 320,
    display: 'block',
  },
  emptyState: {
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
    minHeight: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px dashed ${theme.colors.border.secondary}`,
    borderRadius: theme.borderRadius.md,
  },
  tooltip: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 10,
    backgroundColor: theme.colors.background.tertiary,
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    fontFamily: theme.fonts.primary,
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
};
