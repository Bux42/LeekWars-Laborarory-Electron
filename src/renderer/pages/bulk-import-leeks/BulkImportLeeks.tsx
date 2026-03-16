import { useState } from 'react';
import { Upload, Button as AntButton, Progress } from 'antd';
import { RcFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { bulkImportLeeksStyles as styles } from './BulkImportLeeks.styles';
import { IEntityBuild } from '../../../services/leekwars-laboratory/types/builds/EntityBuild.types';
import { IEntityBuildImported } from './BulkImportLeeks.types';
import LeekscriptAIPicker from '../../components/leekscript-ai/leekscript-ai-picker/LeekscriptAIPicker';
import Button from '../../components/shared/button/Button';
import { usePostLeeksAdd } from '../../../services/leeks/leeks';
import LeekAvatarPicker from '../../components/leek/leek-avatar-picker/LeekAvatarPicker';
import WeaponList from '../../components/weapon/weapon-list/WeaponList';

function BulkImportLeeks() {
  const [error, setError] = useState<string | null>(null);
  const [entityBuilds, setEntityBuilds] = useState<IEntityBuildImported[]>([]);
  const [selectedAiId, setSelectedAiId] = useState<string>('');
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [bulkAdding, setBulkAdding] = useState<boolean>(false);
  const [addedCount, setAddedCount] = useState<number>(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string>('leek1_front_green');

  const addLeekMutation = usePostLeeksAdd();

  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonText = e.target?.result;

      if (typeof jsonText !== 'string') {
        setError('Failed to read file');
        return;
      }

      try {
        const json = JSON.parse(jsonText) as IEntityBuild;
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
        setEntityBuilds((prev) => [
          ...prev,
          { entityBuild: json, fileName: fileNameWithoutExtension },
        ]);
        setError(null);

        // Set leek name from file name (without extension)
        // setLeekName(fileNameWithoutExtension);
      } catch {
        setError('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
    return false; // Prevent automatic upload
  };

  const handleCreateBulk = () => {
    if (entityBuilds.length === 0 || !selectedAiId) {
      setError('Please import builds and select an AI before creating');
      return;
    }
    setShowProgress(true);
    setBulkAdding(true);
    setError(null);
    setSuccess(null);
    setAddedCount(0);

    const createNext = async (index: number) => {
      if (index >= entityBuilds.length) {
        setBulkAdding(false);
        setSuccess(`Successfully imported ${entityBuilds.length} leeks!`);
        return;
      }

      const build = entityBuilds[index];

      const newLeek = {
        name: build.fileName,
        build: build.entityBuild,
        aiId: selectedAiId,
        imageName: avatar,
      };

      try {
        await addLeekMutation.mutateAsync({ data: newLeek });
        setAddedCount((count) => count + 1);
        createNext(index + 1);
      } catch (err) {
        setBulkAdding(false);
        setError(
          `Failed to create leek from "${build.fileName}": ${err instanceof Error ? err.message : 'Unknown error'}`,
        );
      }
    };

    createNext(0);
  };

  return (
    <>
      <h1>Import leeks bulk</h1>

      <div style={styles.section}>
        <h2>Step 1: Import Builds</h2>
        <p>
          Select one or multiple{' '}
          <a
            href="https://leek-wars-restator.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Restator Remastered
          </a>{' '}
          exported JSON files to import:
        </p>

        <Upload
          accept=".json"
          showUploadList={false}
          multiple
          beforeUpload={beforeUpload}
        >
          <AntButton icon={<UploadOutlined />}>
            Select your JSON files
          </AntButton>
        </Upload>

        {error && <p style={styles.error}>{error}</p>}
      </div>
      {entityBuilds.length > 0 && (
        <div style={styles.section}>
          <h2>Imported Builds</h2>
          <div style={styles.importedBuildsContainer}>
            {entityBuilds.map((build) => (
              <div style={styles.buidContainer} key={`${build.fileName}`}>
                <div style={styles.buildFileName}>{build.fileName}</div>
                <div style={styles.weaponsContainer}>
                  <WeaponList weaponIds={build.entityBuild.selectedWeaponIds} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={styles.section}>
        <h2>Step 2: Select LeekScript AI Snapshot</h2>
        <div style={styles.section}>
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
      </div>
      <div style={styles.section}>
        <h2>Step 3: Select Leek Avatar</h2>
        <div style={styles.section}>
          <LeekAvatarPicker
            onChange={setAvatar}
            selectedAvatar={avatar}
            level={0}
          />
        </div>
      </div>

      <div style={styles.section}>
        {showProgress && (
          <Progress percent={(addedCount / entityBuilds.length) * 100} />
        )}
        {success && <p style={styles.successMessage}>{success}</p>}
        <Button
          onClick={handleCreateBulk}
          variant="primary"
          disabled={bulkAdding || !selectedAiId || entityBuilds.length === 0}
        >
          {bulkAdding ? 'Creating...' : `Bulk import leeks`}
        </Button>
      </div>
    </>
  );
}

export default BulkImportLeeks;
