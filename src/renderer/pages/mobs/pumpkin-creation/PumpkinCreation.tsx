import { useMemo, useState } from 'react';
import { RcFile } from 'antd/es/upload';
import { Button, Input, Radio, Result, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BossImage from '../../../components/boss/boss-image/BossImage';
import { getJson } from '../../../utils/JsonLoader';
import { pumpkinCreationStyles as styles } from './PumpkinCreation.styles';
import { IEntityBuild } from '../../../../services/leekwars-laboratory/types/builds/EntityBuild.types';
import EntityBuild from '../../../components/entity/entity-build/EntityBuild';
import LeekscriptAIPicker from '../../../components/leekscript-ai/leekscript-ai-picker/LeekscriptAIPicker';
import { usePostMobsAdd } from '../../../../services/mobs/mobs';
import { MobType } from '../../../constants/mobs/Mobs.constants';

function PumpkinCreation() {
  const [selectedBoss, setSelectedBoss] = useState<string | null>(null);
  const [selectedBossBuild, setSelectedBossBuild] =
    useState<IEntityBuild | null>(null);
  const [bossName, setBossName] = useState<string>('');
  const [jsonBuildError, setJsonBuildError] = useState<string | null>(null);
  const [selectedAiId, setSelectedAiId] = useState<string>('');
  const [creationSuccess, setCreationSuccess] = useState<string | null>(null);

  const addMobMutation = usePostMobsAdd();

  const bossNames = useMemo(
    () => ['evil_pumpkin', 'hubbard', 'turban', 'warty', 'offspring'],
    [],
  );

  const bossNamesToRealNames: Record<string, string> = useMemo(
    () => ({
      evil_pumpkin: 'Evil Pumpkin',
      hubbard: 'Hubbard',
      turban: 'Turban',
      warty: 'Warty',
      offspring: 'Offspring',
    }),
    [],
  );

  const bossData: IEntityBuild[] = useMemo(
    () =>
      bossNames.map((name) =>
        getJson(`builds/pumpkin/${name}`),
      ) as IEntityBuild[],
    [bossNames],
  );

  const resetToDefaultBuild = () => {
    if (selectedBoss) {
      const build = bossData[bossNames.indexOf(selectedBoss)];
      setSelectedBossBuild(build);
      setJsonBuildError(null);
    }
  };

  const onSelectBoss = (bossInternalName: string, bossIndex: number) => {
    setSelectedBoss(bossInternalName);
    setBossName(bossNamesToRealNames[bossInternalName] || bossInternalName);
    const build = bossData[bossIndex];

    if (build) {
      setSelectedBossBuild(build);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonText = e.target?.result;

      if (typeof jsonText !== 'string') {
        setJsonBuildError('Failed to read file');
        return;
      }

      try {
        const json = JSON.parse(jsonText) as IEntityBuild;
        setSelectedBossBuild(json);
        setJsonBuildError(null);

        // Set leek name from file name (without extension)
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
        setBossName(fileNameWithoutExtension);
      } catch {
        setJsonBuildError('Failed to parse JSON file');
        setSelectedBossBuild(null);
      }
    };
    reader.readAsText(file);
    return false; // Prevent automatic upload
  };

  const createMob = async () => {
    if (!selectedBoss || !selectedBossBuild || !selectedAiId) {
      setJsonBuildError(
        'Please select a boss, configure it, and select an AI before creating.',
      );
      return;
    }

    try {
      await addMobMutation.mutateAsync({
        data: {
          name: bossName,
          internalName: selectedBoss,
          type: 'pumpkin' as MobType,
          build: selectedBossBuild,
          aiId: selectedAiId,
        },
      });
      setJsonBuildError(null);
      setCreationSuccess(`Mob "${bossName}" created successfully!`);
    } catch (err) {
      setJsonBuildError(
        err instanceof Error ? err.message : 'Failed to create mob',
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create New Pumpkin</h1>
      <h3>Step 1: Select a mob</h3>
      <Radio.Group
        size="large"
        onChange={(e) =>
          onSelectBoss(e.target.value, bossNames.indexOf(e.target.value))
        }
        value={selectedBoss}
      >
        {bossNames.map((name) => (
          <Radio.Button key={name} value={name} style={styles.radioButton}>
            <BossImage boss={{ internalName: name }} height={56} width={56} />
          </Radio.Button>
        ))}
      </Radio.Group>
      {selectedBoss && (
        <div style={styles.container}>
          <h3>Step 2: Configure your pumpkin</h3>
          <Input
            type="text"
            placeholder="Enter pumpkin name"
            value={bossName}
            onChange={(e) => setBossName(e.target.value)}
          />
          <LeekscriptAIPicker
            selectedAiId={selectedAiId}
            onSelect={setSelectedAiId}
          />
          <div style={styles.uploadContainer}>
            <Upload
              accept=".json"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Select your JSON file</Button>
            </Upload>
            <p>or</p>
            <Button onClick={resetToDefaultBuild}>
              Reset to Default Build
            </Button>
          </div>
          {jsonBuildError && <Result status="error" title={jsonBuildError} />}
          {selectedBossBuild && <EntityBuild entityBuild={selectedBossBuild} />}
          {!selectedAiId && (
            <p style={styles.errorText}>
              Please select an AI to use for this pumpkin.
            </p>
          )}
          {creationSuccess && (
            <Result status="success" title={creationSuccess} />
          )}
          <Button disabled={!selectedAiId} onClick={createMob}>
            Create pumpkin
          </Button>
        </div>
      )}
    </div>
  );
}

export default PumpkinCreation;
