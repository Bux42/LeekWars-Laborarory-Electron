export interface IServerStatusStyles {
  container: React.CSSProperties;
  status: React.CSSProperties;
  statusIndicator: React.CSSProperties;
}

export const serverStatusStyles: IServerStatusStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  status: {
    fontSize: 14,
    fontWeight: 500,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#ccc',
  },
};
