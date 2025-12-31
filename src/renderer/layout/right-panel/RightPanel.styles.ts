export interface IRightPanelStyles {
  container: React.CSSProperties;
}

export const rightPanelStyles: IRightPanelStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    backgroundColor: '#3c4049',
    color: '#fff',
    padding: 20,
    overflowY: 'auto',
  },
};
