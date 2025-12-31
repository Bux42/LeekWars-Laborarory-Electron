import React, { useState } from 'react';
import { leekCreationStyles as styles } from './LeekCreation.styles';
import { IEntityBuild } from '../../../services/leekwars-laboratory/builds/EntityBuild.types';
import EntityBuild from '../../components/entity-build/EntityBuild';

function LeekCreation() {
  const [entityBuild, setEntityBuild] = useState<IEntityBuild | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        <div style={styles.section}>
          <h2>Build Preview</h2>
          <EntityBuild entityBuild={entityBuild} />
        </div>
      )}
    </div>
  );
}

export default LeekCreation;
