import { useState } from 'react';
import { IEntityBuild } from '../../../services/leekwars-laboratory/types/builds/EntityBuild.types';
import EntityBuild from '../../components/entity/entity-build/EntityBuild';
import Input from '../../components/shared/input/Input';
import LeekscriptAIPicker from '../../components/leekscript-ai/leekscript-ai-picker/LeekscriptAIPicker';
import Button from '../../components/shared/button/Button';
import { turretCreationStyles as styles } from './TurretCreation.styles';
import { Slider } from 'antd';
import { useTurretStats } from '../../../hooks/teams/useTurretStats';
import EntityStats from '../../components/entity/entity-stats/EntityStats';

function TurretCreation() {
  const [entityBuild, setEntityBuild] = useState<IEntityBuild | null>(null);
  const [level, setLevel] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [selectedAiId, setSelectedAiId] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [turretName, setTurretName] = useState<string>('');

  const { minStats, maxStats } = useTurretStats(level);

  return (
    <>
      <h1>Create New Turret</h1>
      <div style={styles.section}>
        <div>Level</div>
        <Slider value={level} min={1} max={100} onChange={setLevel} />
        <EntityStats minStats={minStats} totalStats={maxStats} />
      </div>
    </>
  );
}

export default TurretCreation;
