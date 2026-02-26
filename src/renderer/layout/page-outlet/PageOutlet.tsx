import { Outlet } from 'react-router-dom';
import { pageOutletStyles as styles } from './PageOutlet.styles';

function PageOutlet() {
  return (
    <div style={styles.container}>
      <Outlet />
    </div>
  );
}

export default PageOutlet;
