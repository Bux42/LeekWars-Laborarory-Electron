import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { leftPanelStyles as styles } from './LeftPanel.styles';
import { theme } from '../../theme';

function LeftPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/pools', label: 'Pools' },
    { path: '/leeks', label: 'Leeks' },
  ];

  const getNavLinkStyle = (path: string) => ({
    ...styles.navLink,
    backgroundColor:
      location.pathname === path
        ? theme.colors.background.elevated
        : 'transparent',
  });

  return (
    <aside style={styles.container}>
      <h3>Navigation</h3>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <div
            key={item.path}
            role="button"
            tabIndex={0}
            style={getNavLinkStyle(item.path)}
            onClick={() => navigate(item.path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(item.path);
              }
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor =
                  theme.colors.background.tertiary;
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default LeftPanel;
