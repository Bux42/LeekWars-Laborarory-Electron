export interface IServerStatusStyles {
  container: React.CSSProperties;
  status: React.CSSProperties;
  statusIndicator: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
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
  input: {
    padding: '5px 10px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    width: 80,
  },
  button: {
    padding: '5px 15px',
    fontSize: 14,
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#007acc',
    color: '#fff',
    cursor: 'pointer',
  },
};
