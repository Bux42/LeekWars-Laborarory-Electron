import { theme } from '../../../theme';

export interface TeamPickerStyles {
  container: React.CSSProperties;
  label: React.CSSProperties;
  teamsGrid: React.CSSProperties;
  teamItem: React.CSSProperties;
}

export const teamPickerStyles: TeamPickerStyles = {
  container: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '8px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
  },
  teamsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  teamItem: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: `1px solid ${theme.colors.border.primary}`,
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};
