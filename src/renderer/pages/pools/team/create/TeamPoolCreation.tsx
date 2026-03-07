import { useGetTurretsAll } from '../../../../../services/turrets/turrets';
import TurretPicker from '../../../../components/turret/turret-picker/TurretPicker';

function TeamPoolCreation() {
  const {
    data: turrets,
    isLoading: isLoadingTurrets,
    isError: isErrorTurrets,
  } = useGetTurretsAll();

  return (
    <div>
      TeamPoolCreation
      <TurretPicker
        availableTurrets={turrets?.turrets || []}
        selectedTurretIds={[]}
        onTurretSelect={() => {}}
        label="Select Turrets"
      />
    </div>
  );
}

export default TeamPoolCreation;
