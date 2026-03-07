export interface TurretImageStyles {
  container: (
    width?: number | string,
    height?: number | string,
  ) => React.CSSProperties;
  svg: React.CSSProperties;
}

export const turretImageStyles: TurretImageStyles = {
  container: (width?: number | string, height?: number | string) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: height ?? '100%',
    width: width ?? '100%',
  }),
  svg: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
};
