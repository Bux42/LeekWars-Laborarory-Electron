export interface TurretCardStyles {
  container: React.CSSProperties;
  image: React.CSSProperties;
  name: React.CSSProperties;
  description: React.CSSProperties;
  turretImage: React.CSSProperties;
}

export const turretCardStyles: TurretCardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '200px',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '12px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },
  turretImage: {
    width: 64,
    height: 64,
  },
};
