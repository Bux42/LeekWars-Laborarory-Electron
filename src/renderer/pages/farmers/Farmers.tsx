import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { farmersStyles as styles } from './Farmers.styles';

function Farmers() {
  const navigate = useNavigate();
  const farmers = [];
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Farmers</h1>
        <Button onClick={() => navigate('/new-farmer')}>Add Farmer</Button>
      </div>
      {farmers.length === 0 ? (
        <p>No farmers found.</p>
      ) : (
        // <FarmerList farmers={farmers} getDropdownItems={getDropdownItems} />
        <p>Farmers list will go here.</p>
      )}
    </div>
  );
}

export default Farmers;
