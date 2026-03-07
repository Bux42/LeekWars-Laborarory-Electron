import { useEffect, useState } from 'react';
import { Slider } from 'antd';
import { IEntityBuild } from '../../../services/leekwars-laboratory/types/builds/EntityBuild.types';
import Input from '../../components/shared/input/Input';
import LeekscriptAIPicker from '../../components/leekscript-ai/leekscript-ai-picker/LeekscriptAIPicker';
import Button from '../../components/shared/button/Button';
import { turretCreationStyles as styles } from './TurretCreation.styles';
import { useTurretStats } from '../../../hooks/teams/useTurretStats';
import EntityStats from '../../components/entity/entity-stats/EntityStats';
import { usePostTurretsAdd } from '../../../services/turrets/turrets';
import ChipList from '../../components/chip/chip-list/ChipList';
import { TURRET_CHIPS_IDS } from '../../constants/leekwars/Chips';
import { getEmptyStats } from '../../utils/LeekWars';

function TurretCreation() {
  const [entityBuild, setEntityBuild] = useState<IEntityBuild | null>(null);
  const [level, setLevel] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [selectedAiId, setSelectedAiId] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [turretName, setTurretName] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);

  const { minStats, maxStats } = useTurretStats(level);

  useEffect(() => {
    setEntityBuild({
      level,
      selectedWeaponIds: [],
      selectedChipIds: TURRET_CHIPS_IDS,
      equippedComponentIds: [],
      bonusStats: getEmptyStats(),
      investedCapital: 0,
      investedStats: maxStats,
      totalCapital: 0,
    });
  }, [level, maxStats, minStats]);

  const postTurretsAdd = usePostTurretsAdd();

  const handleCreate = async () => {
    if (!entityBuild || !turretName || !selectedAiId) {
      setError('Please complete all steps before creating');
      return;
    }

    setCreating(true);

    try {
      await postTurretsAdd.mutateAsync({
        data: {
          name: turretName,
          aiId: selectedAiId,
          build: entityBuild,
        },
      });
    } catch {
      setError('Failed to create turret. Please try again.');
      return;
    }

    setCreating(false);
    setError(null);
    setSuccess(`Turret "${turretName}" created successfully!`);
  };

  return (
    <>
      <h1>Create New Turret</h1>
      <div style={styles.section}>
        <div>Turret Name</div>
        <Input
          type="text"
          placeholder="Enter turret name"
          value={turretName}
          onChange={setTurretName}
        />
        <div>Level</div>
        <Slider value={level} min={1} max={100} onChange={setLevel} />
        <EntityStats minStats={minStats} totalStats={maxStats} />
        <ChipList chipIds={TURRET_CHIPS_IDS} />
        <LeekscriptAIPicker
          onSelect={setSelectedAiId}
          selectedAiId={selectedAiId}
        />
        {selectedAiId && (
          <p style={styles.successMessage}>
            Selected AI ID: {selectedAiId.substring(0, 8)}
          </p>
        )}
      </div>
      <div style={styles.section}>
        {error && <p style={styles.error}>{error}</p>}
        <Button
          onClick={handleCreate}
          variant="primary"
          disabled={creating || !turretName || !selectedAiId}
        >
          {creating ? 'Creating...' : 'Create Turret'}
        </Button>
        {success && <p style={styles.successMessage}>{success}</p>}
      </div>
    </>
  );
}

export default TurretCreation;
