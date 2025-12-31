export interface IHeaderStyles {
  container: React.CSSProperties;
}

export const headerStyles: IHeaderStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: '#fff',
    height: 60,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};
