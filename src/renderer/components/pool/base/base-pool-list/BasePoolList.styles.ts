import React from 'react';
import { theme } from '../../../../theme';

export interface IBasePoolListStyles {
  container: React.CSSProperties;
  item: React.CSSProperties;
  info: React.CSSProperties;
  nameContainer: React.CSSProperties;
  name: React.CSSProperties;
  details: React.CSSProperties;
  actions: React.CSSProperties;
  emptyText: React.CSSProperties;
}

export const basePoolListStyles: IBasePoolListStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border.primary}`,
    transition: 'background-color 0.2s, border-color 0.2s',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  details: {
    fontSize: '0.85rem',
    color: theme.colors.text.secondary,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.text.tertiary,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: theme.spacing.md,
  },
};
