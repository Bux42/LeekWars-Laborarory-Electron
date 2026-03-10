import { useMemo, useState } from 'react';
import { useGetLeeksAll } from '../../../services/leeks/leeks';
import LeekPicker from '../../components/leek/leek-picker/LeekPicker';
import Button from '../../components/shared/button/Button';
import { LeekResponse } from '../../../services/leekwarsToolsAPI.schemas';
import { teamCreationStyles as styles } from './TeamCreation.styles';
import Input from '../../components/shared/input/Input';
import TurretPicker from '../../components/turret/turret-picker/TurretPicker';
import { useGetTurretsAll } from '../../../services/turrets/turrets';
import LeekList from '../../components/leek/leek-list/LeekList';
import { IDropdownItem } from '../../components/shared/dropdown/Dropdown.types';
import { usePostTeamsAdd } from '../../../services/teams/teams';

function TeamCreation() {
  const [teamName, setTeamName] = useState('');
  const [selectedLeeks, setSelectedLeeks] = useState<LeekResponse[]>([]);
  const [selectedTurretId, setSelectedTurretId] = useState<string | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    data: turrets,
    isLoading: isLoadingTurrets,
    isError: isErrorTurrets,
  } = useGetTurretsAll();

  const {
    data: allLeeks,
    isLoading,
    error: leeksError,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const { mutate: createTeam } = usePostTeamsAdd();

  const onLeekSelect = (leekId: string) => {
    const leek = allLeeks?.leeks.find((l) => l.id === leekId);
    if (!leek) return;
    if (selectedLeeks.includes(leek)) {
      setSelectedLeeks((prev) => prev.filter((l) => l.id !== leekId));
    } else {
      setSelectedLeeks((prev) => [...prev, leek]);
    }
  };

  const validTeam = useMemo(
    () =>
      teamName.trim() !== '' &&
      selectedLeeks.length > 0 &&
      selectedTurretId !== undefined,
    [teamName, selectedLeeks, selectedTurretId],
  );

  const handleSubmit = async () => {
    if (!validTeam || !selectedTurretId) return;
    setError(null);
    setSuccess(null);
    try {
      await createTeam({
        data: {
          name: teamName,
          leekIds: selectedLeeks.map((leek) => leek.id),
          turretId: selectedTurretId,
        },
      });
      setSuccess('Team created successfully!');
      setTeamName('');
      setSelectedLeeks([]);
      setSelectedTurretId(undefined);
    } catch (err) {
      console.error('Failed to create team:', err);
      setError('Failed to create team. Please try again.');
    }
  };

  return (
    <>
      <div style={styles.header}>
        <h1>Team Creation</h1>
      </div>
      <Input
        placeholder="Enter team name"
        value={teamName}
        onChange={(value) => setTeamName(value)}
      />
      <div style={styles.section}>
        <h2>Select turret</h2>
        <TurretPicker
          availableTurrets={turrets?.turrets || []}
          onTurretSelect={setSelectedTurretId}
          selectedTurretId={selectedTurretId}
          label="Select a turret"
        />
        <h2>Select leeks</h2>
        <LeekList leeks={selectedLeeks} />
        <LeekPicker
          label="Select at least one leek"
          availableLeeks={allLeeks?.leeks || []}
          onLeekSelect={onLeekSelect}
          selectedLeekIds={selectedLeeks.map((leek) => leek.id)}
        />
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <Button variant="primary" onClick={handleSubmit} disabled={!validTeam}>
          Create Team
        </Button>
      </div>
    </>
  );
}

export default TeamCreation;
