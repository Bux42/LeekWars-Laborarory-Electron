import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leekCreationStyles as styles } from './LeekCreation.styles';
import { IEntityBuild } from '../../../services/leekwars-laboratory/types/builds/EntityBuild.types';
import LeekAvatarPicker from '../../components/leek/leek-avatar-picker/LeekAvatarPicker';
import Input from '../../components/shared/input/Input';
import Button from '../../components/shared/button/Button';
import FileBrowser from '../../components/file-browser/FileBrowser';
import { IFileListItem } from '../../../services/FileService/requests/FileList.types';
import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';
import { useAddLeek } from '../../../hooks/leeks/useAddLeek';
import EntityBuild from '../../components/entity/entity-build/EntityBuild';

function LeekCreation() {
  const navigate = useNavigate();
  const [entityBuild, setEntityBuild] = useState<IEntityBuild | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] =
    useState<string>('leek1_front_green');
  const [leekName, setLeekName] = useState<string>('');
  const [selectedAiFile, setSelectedAiFile] = useState<IFileListItem | null>(
    null,
  );
  const [success, setSuccess] = useState<string | null>(null);

  const addLeekMutation = useAddLeek();

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text) as IEntityBuild;
      setEntityBuild(json);
      setError(null);

      // Set leek name from file name (without extension)
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
      setLeekName(fileNameWithoutExtension);
    } catch {
      setError('Failed to parse JSON file');
      setEntityBuild(null);
    }
  };

  const handleCreate = async () => {
    if (!entityBuild || !leekName || !selectedAiFile) {
      setError('Please complete all steps before creating');
      return;
    }

    const newLeek: ILeek = {
      id: '',
      name: leekName,
      build: entityBuild,
      elo: 1000,
      aiFilePath: selectedAiFile.path,
      imageName: selectedAvatar,
    };

    try {
      setError(null);
      setSuccess(null);

      const response = await addLeekMutation.mutateAsync({ leek: newLeek });
      setSuccess(`Leek "${response.leek.name}" created successfully!`);

      // Redirect to leeks page after a short delay
      navigate('/leeks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create leek');
    }
  };

  const creating = addLeekMutation.isPending;

  return (
    <div style={styles.container}>
      <h1>Create New Leek</h1>

      <div style={styles.section}>
        <h2>Step 1: Import Build</h2>
        <p>
          Select a{' '}
          <a
            href="https://leek-wars-restator.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Restator Remastered
          </a>{' '}
          exported JSON file to import:
        </p>

        <input
          type="file"
          accept=".json"
          onChange={handleFileImport}
          style={styles.fileInput}
        />

        {error && <p style={styles.error}>{error}</p>}
      </div>

      {entityBuild && (
        <>
          <div style={styles.section}>
            <h2>Build Preview</h2>
            <EntityBuild entityBuild={entityBuild} />
          </div>
          <div style={styles.section}>
            <h2>Step 2: Choose Avatar and Name</h2>
            <div style={styles.avatarNameRow}>
              <LeekAvatarPicker
                level={entityBuild.level}
                selectedAvatar={selectedAvatar}
                onChange={setSelectedAvatar}
              />
              <div style={styles.nameInputContainer}>
                <Input
                  type="text"
                  placeholder="Enter leek name"
                  value={leekName}
                  onChange={setLeekName}
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2>Step 3: Select AI File</h2>
            <FileBrowser
              onFileSelect={setSelectedAiFile}
              selectedFile={selectedAiFile}
            />
            {selectedAiFile && (
              <p style={{ marginTop: '8px', color: '#4ec9b0' }}>
                Selected: {selectedAiFile.name}
              </p>
            )}
          </div>

          <div style={styles.section}>
            <Button
              onClick={handleCreate}
              variant="primary"
              disabled={creating || !leekName || !selectedAiFile}
            >
              {creating ? 'Creating...' : 'Create Leek'}
            </Button>
            {success && (
              <p style={{ marginTop: '8px', color: '#4ec9b0' }}>{success}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default LeekCreation;
