import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leekCreationStyles as styles } from './LeekCreation.styles';
import { IEntityBuild } from '../../../services/leekwars-laboratory/types/builds/EntityBuild.types';
import LeekAvatarPicker from '../../components/leek/leek-avatar-picker/LeekAvatarPicker';
import Input from '../../components/shared/input/Input';
import Button from '../../components/shared/button/Button';
import LeekscriptAIPicker from '../../components/leekscript-ai/leekscript-ai-picker/LeekscriptAIPicker';
import { usePostLeeksAdd } from '../../../services/leeks/leeks';
import EntityBuild from '../../components/entity/entity-build/EntityBuild';

function LeekCreation() {
  const navigate = useNavigate();
  const [entityBuild, setEntityBuild] = useState<IEntityBuild | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] =
    useState<string>('leek1_front_green');
  const [leekName, setLeekName] = useState<string>('');
  const [selectedAiId, setSelectedAiId] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);

  const addLeekMutation = usePostLeeksAdd();

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
    if (!entityBuild || !leekName || !selectedAiId) {
      setError('Please complete all steps before creating');
      return;
    }

    const newLeek = {
      name: leekName,
      build: entityBuild,
      aiId: selectedAiId,
      imageName: selectedAvatar,
    };

    try {
      setError(null);
      setSuccess(null);

      const response = await addLeekMutation.mutateAsync({ data: newLeek });
      const createdLeekName = response.leek?.name ?? leekName;
      setSuccess(`Leek "${createdLeekName}" created successfully!`);

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
            <h2>Step 3: Select LeekScript AI Snapshot</h2>
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
            <Button
              onClick={handleCreate}
              variant="primary"
              disabled={creating || !leekName || !selectedAiId}
            >
              {creating ? 'Creating...' : 'Create Leek'}
            </Button>
            {success && <p style={styles.successMessage}>{success}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default LeekCreation;
