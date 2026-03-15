import React from 'react';
import { theme } from '../../../theme';

export interface IMatrixHeatmapChartStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  sliderContainer: React.CSSProperties;
  subtitle: React.CSSProperties;
  matrixScroll: React.CSSProperties;
  matrixGrid: React.CSSProperties;
  cornerCell: React.CSSProperties;
  axisCell: React.CSSProperties;
  axisLabel: React.CSSProperties;
  rowHeaderCell: React.CSSProperties;
  columnHeaderCell: React.CSSProperties;
  dataCell: React.CSSProperties;
  legendSection: React.CSSProperties;
  legendTitle: React.CSSProperties;
  gradientLegendWrapper: React.CSSProperties;
  gradientLegendBar: React.CSSProperties;
  gradientLegendLabels: React.CSSProperties;
  entitiesLegend: React.CSSProperties;
  entityLegendItem: React.CSSProperties;
  tooltip: React.CSSProperties;
  tooltipPair: React.CSSProperties;
  tooltipValue: React.CSSProperties;
  tooltipMeta: React.CSSProperties;
  emptyState: React.CSSProperties;
}

export const matrixHeatmapChartStyles: IMatrixHeatmapChartStyles = {
  container: {
    width: '100%',
    backgroundColor: theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  title: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.primary,
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: 0,
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  subtitle: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.secondary,
    fontSize: 12,
    margin: 0,
  },
  matrixScroll: {
    overflow: 'auto',
    border: `1px solid ${theme.colors.border.primary}`,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.primary,
  },
  matrixGrid: {
    display: 'grid',
    width: 'max-content',
  },
  cornerCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.tertiary,
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
    fontSize: 11,
    borderRight: `1px solid ${theme.colors.border.primary}`,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },
  axisCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 11,
    padding: `0 ${theme.spacing.xs}px`,
    backgroundColor: theme.colors.background.tertiary,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'clip',
    lineHeight: 1.2,
    textAlign: 'center',
  },
  axisLabel: {
    display: '-webkit-box',
    width: '100%',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  rowHeaderCell: {
    borderRight: `1px solid ${theme.colors.border.primary}`,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    justifyContent: 'flex-start',
  },
  columnHeaderCell: {
    borderRight: `1px solid ${theme.colors.border.primary}`,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
  },
  dataCell: {
    borderRight: `1px solid ${theme.colors.border.primary}`,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    transition:
      'transform 120ms ease, box-shadow 120ms ease, filter 120ms ease',
    cursor: 'pointer',
  },
  legendSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  legendTitle: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.secondary,
    fontSize: 12,
    margin: 0,
  },
  gradientLegendWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  gradientLegendBar: {
    width: '100%',
    height: 14,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.primary}`,
    background:
      'linear-gradient(90deg, rgba(52, 211, 153, 1) 0%, rgba(253, 224, 71, 1) 50%, rgba(248, 113, 113, 1) 100%)',
  },
  gradientLegendLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
    fontSize: 11,
  },
  entitiesLegend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  entityLegendItem: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing.xs}px`,
    height: 20,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border.secondary}`,
    backgroundColor: theme.colors.background.tertiary,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.primary,
    fontSize: 11,
    maxWidth: 168,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tooltip: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 20,
    backgroundColor: theme.colors.background.tertiary,
    border: `1px solid ${theme.colors.border.focus}`,
    borderRadius: theme.borderRadius.sm,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    minWidth: 180,
    boxShadow: `0 0 0 1px ${theme.colors.border.primary}`,
  },
  tooltipPair: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.primary,
    fontSize: 12,
    fontWeight: 600,
    margin: 0,
  },
  tooltipValue: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.primary,
    fontSize: 12,
    margin: 0,
  },
  tooltipMeta: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.secondary,
    fontSize: 11,
    margin: 0,
  },
  emptyState: {
    border: `1px dashed ${theme.colors.border.secondary}`,
    borderRadius: theme.borderRadius.sm,
    minHeight: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.primary,
  },
};
