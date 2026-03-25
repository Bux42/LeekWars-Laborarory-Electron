import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { pumpkinsStyles as styles } from './Pumpkins.styles';
import {
  useDeleteMobsDeleteMobId,
  useGetMobsAllMobType,
} from '../../../../services/mobs/mobs';
import MobList from '../../../components/mob/mob-list/MobList';
import Spinner from '../../../components/shared/spinner/Spinner';
import { MobResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../../components/shared/dropdown/Dropdown.types';

function Pumpkins() {
  const navigate = useNavigate();
  const [mobs, setMobs] = useState<MobResponse[]>([]);

  const {
    data: pumpkins,
    isLoading: isLoadingPumpkins,
    error: pumpkinsError,
  } = useGetMobsAllMobType('pumpkin');

  useEffect(() => {
    if (pumpkins?.mobs) {
      setMobs(pumpkins.mobs);
    }
  }, [pumpkins?.mobs]);

  const deleteMobMutation = useDeleteMobsDeleteMobId();

  const handleDelete = async (mob: MobResponse) => {
    if (!mob.id) {
      return;
    }

    if (window.confirm(`Are you sure you want to delete mob "${mob.name}"?`)) {
      try {
        await deleteMobMutation.mutateAsync({ mobId: mob.id });
        setMobs((prevMobs) => prevMobs.filter((m) => m.id !== mob.id));
      } catch (err) {
        console.error('Failed to delete mob:', err);
      }
    }
    // Implement delete logic here
  };

  const getDropdownItems = (mob: MobResponse): IDropdownItem[] => [
    {
      label: 'Delete',
      onClick: () => handleDelete(mob),
      variant: 'danger',
    },
  ];

  if (isLoadingPumpkins) {
    return <Spinner size="small" label="Loading pumpkins..." />;
  }

  if (pumpkinsError) {
    return <Result status="error" title="Error loading pumpkins" />;
  }

  return (
    <>
      <div style={styles.header}>
        <h1>Pumpkins</h1>
        <Button onClick={() => navigate('new-pumpkin')}>Add Pumpkin</Button>
      </div>

      {pumpkins?.mobs.length === 0 ? (
        <Result status="info" title="No pumpkins found." />
      ) : (
        <MobList mobs={mobs} getDropdownItems={getDropdownItems} />
      )}
    </>
  );
}

export default Pumpkins;
