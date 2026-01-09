import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { breadcrumbsStyles as styles } from './Breadcrumbs.styles';
import { theme } from '../../theme';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  // Capitalize first letter of breadcrumb label
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div style={styles.container}>
      <div style={styles.navigationButtons}>
        <button
          onClick={handleBack}
          style={styles.navButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.colors.background.elevated;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.colors.background.tertiary;
          }}
          title="Back"
        >
          &lt;
        </button>
        <button
          onClick={handleForward}
          style={styles.navButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.colors.background.elevated;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.colors.background.tertiary;
          }}
          title="Forward"
        >
          &gt;
        </button>
      </div>

      <nav style={styles.breadcrumbs}>
        <Link
          to="/"
          style={{
            ...styles.breadcrumbItem,
            ...(location.pathname === '/' ? styles.breadcrumbItemActive : {}),
          }}
          onMouseEnter={(e) => {
            if (location.pathname !== '/') {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.tertiary;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Home
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={to}>
              <span style={styles.separator}>/</span>
              <Link
                to={to}
                style={{
                  ...styles.breadcrumbItem,
                  ...(last ? styles.breadcrumbItemActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (!last) {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.background.tertiary;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {capitalize(value)}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
