import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { turretsStyles as styles } from './Turrets.styles';
import {
  useDeleteTurretsDeleteTurretId,
  useGetTurretsAll,
} from '../../../services/turrets/turrets';
import TurretList from '../../components/turret/turret-list/TurretList';
import { TurretResponse } from '../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';
import Spinner from '../../components/shared/spinner/Spinner';

function Turrets() {
  const navigate = useNavigate();

  const {
    data: turrets,
    isLoading: isLoadingTurrets,
    isError: isErrorTurrets,
  } = useGetTurretsAll();

  const { mutate: deleteTurret } = useDeleteTurretsDeleteTurretId();

  const handleEdit = (turret: TurretResponse) => {
    console.log('Edit turret:', turret.name);
  };

  const handleDuplicate = (turret: TurretResponse) => {
    console.log('Duplicate turret:', turret.name);
  };

  const handleDelete = async (turret: TurretResponse) => {
    if (
      window.confirm(`Are you sure you want to delete turret "${turret.name}"?`)
    ) {
      try {
        await deleteTurret({ turretId: turret.id });
      } catch (err) {
        console.error('Failed to delete turret:', err);
        alert('Failed to delete turret. Please try again.');
      }
    }
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

  if (isLoadingTurrets) {
    return <Spinner size="small" label="Loading turrets..." />;
  }

  if (isErrorTurrets) {
    return <p>Failed to load turrets. Please try again later.</p>;
  }

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
