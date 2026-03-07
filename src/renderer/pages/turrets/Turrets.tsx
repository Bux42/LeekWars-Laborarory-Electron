import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { turretsStyles as styles } from './Turrets.styles';
import { useGetTurretsAll } from '../../../services/turrets/turrets';
import TurretList from '../../components/turret/turret-list/TurretList';
import { TurretResponse } from '../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';

function Turrets() {
  const navigate = useNavigate();

  const {
    data: turrets,
    isLoading: isLoadingTurrets,
    isError: isErrorTurrets,
  } = useGetTurretsAll();

  const handleEdit = (turret: TurretResponse) => {
    console.log('Edit turret:', turret.name);
  };

  const handleDuplicate = (turret: TurretResponse) => {
    console.log('Duplicate turret:', turret.name);
  };

  const handleDelete = (turret: TurretResponse) => {
    console.log('Delete turret:', turret.name);
  };

  const getDropdownItems = (turret: TurretResponse): IDropdownItem[] => [
    {
      label: 'Edit',
      onClick: () => handleEdit(turret),
    },
    {
      label: 'Duplicate',
      onClick: () => handleDuplicate(turret),
    },
    {
      label: 'Delete',
      onClick: () => handleDelete(turret),
      variant: 'danger',
    },
  ];

  return (
    <>
      <div style={styles.header}>
        <h1>Turrets</h1>
        <div style={styles.actions}>
          <Button onClick={() => navigate('/new-turret')}>Add Turret</Button>
        </div>
      </div>
      {turrets && turrets.turrets.length === 0 ? (
        <p>No turrets found.</p>
      ) : (
        <TurretList
          turrets={turrets?.turrets ?? []}
          getDropdownItems={getDropdownItems}
        />
      )}
    </>
  );
}

export default Turrets;
