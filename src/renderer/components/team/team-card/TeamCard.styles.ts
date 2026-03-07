export interface TeamCardStyles {
  container: React.CSSProperties;
  header: React.CSSProperties;
  name: React.CSSProperties;
}

export const teamCardStyles: TeamCardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
