import React, { useState } from 'react';
import { leekCreationStyles as styles } from './LeekCreation.styles';
import { IEntityBuild } from '../../../services/leekwars-laboratory/builds/EntityBuild.types';
import EntityBuild from '../../components/entity-build/EntityBuild';
import LeekAvatarPicker from '../../components/leek-avatar-picker/LeekAvatarPicker';
import Input from '../../components/shared/input/Input';
import FileBrowser from '../../components/file-browser/FileBrowser';
import { IFileListItem } from '../../../services/leekwars-laboratory/requests/FileListRequest.types';

function LeekCreation() {
  const [entityBuild, setEntityBuild] = useState<IEntityBuild | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] =
    useState<string>('leek1_front_green');
  const [leekName, setLeekName] = useState<string>('');
  const [selectedAiFile, setSelectedAiFile] = useState<IFileListItem | null>(
    null,
  );

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
    } catch {
      setError('Failed to parse JSON file');
      setEntityBuild(null);
    }
  };

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
            <h2>Build Preview</h2>
            <EntityBuild entityBuild={entityBuild} />
          </div>
        </>
      )}
    </div>
  );
}

export default LeekCreation;
