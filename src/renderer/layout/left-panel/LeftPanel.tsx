import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { leftPanelStyles as styles } from './LeftPanel.styles';
import { theme } from '../../theme';

function LeftPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  interface NavItem {
    path: string;
    label: string;
    children?: NavItem[];
  }

  const navItems: NavItem[] = [
    { path: '/', label: 'Home' },
    {
      path: '/pools',
      label: 'Pools',
      children: [{ path: '/pools/duels', label: 'Duels' }],
    },
    { path: '/leeks', label: 'Leeks' },
    { path: '/farmers', label: 'Farmers' },
    { path: '/ais', label: 'AIs' },
  ];

  const getNavLinkColor = (path: string, isSubItem = false) => {
    if (location.pathname === path) {
      return theme.colors.text.primary;
    }
    return isSubItem ? theme.colors.text.secondary : theme.colors.text.primary;
  };

  const getNavLinkStyle = (path: string, isSubItem = false) => ({
    ...(isSubItem ? styles.subNavLink : styles.navLink),
    backgroundColor:
      location.pathname === path
        ? theme.colors.background.elevated
        : 'transparent',
    color: getNavLinkColor(path, isSubItem),
  });

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    return (
      <React.Fragment key={item.path}>
        <div
          role="button"
          tabIndex={0}
          style={getNavLinkStyle(item.path, isSubItem)}
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
        {item.children && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {item.children.map((child) => renderNavItem(child, true))}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <aside style={styles.container}>
      <h3>Navigation</h3>
      <nav style={styles.nav}>
        {navItems.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}

export default LeftPanel;
