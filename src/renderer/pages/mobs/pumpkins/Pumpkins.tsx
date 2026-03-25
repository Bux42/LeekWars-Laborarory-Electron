import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { pumpkinsStyles as styles } from './Pumpkins.styles';

function Pumpkins() {
  const navigate = useNavigate();
  return (
    <>
      <div style={styles.header}>
        <h1>Pumpkins</h1>
        <Button onClick={() => navigate('new-pumpkin')}>Add Pumpkin</Button>
      </div>

      {/* {pumpkins.length === 0 ? (
        <Result status="info" title="No pumpkins found." />
      ) : (
        <div style={styles.pumpkinList}>
          {pumpkins.map((pumpkin) => (
            <PumpkinCard
              key={pumpkin.id}
              pumpkin={pumpkin}
              showRemovePumpkinButton
              onRemovePumpkin={handleRemovePumpkin}
            />
          ))}
        </div>
      )} */}
    </>
  );
}

export default Pumpkins;
