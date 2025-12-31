export interface ILayoutStyles {
  container: React.CSSProperties;
  mainContent: React.CSSProperties;
}

export const layoutStyles: ILayoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
};
