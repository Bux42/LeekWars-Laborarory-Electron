import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAiStyles as styles } from './CreateAI.styles';
import FileBrowser from '../../../components/file-browser/FileBrowser';
import Input from '../../../components/shared/input/Input';
import Button from '../../../components/shared/button/Button';
import Spinner from '../../../components/shared/spinner/Spinner';
import { IFileListItem } from '../../../../services/FileService/requests/FileList.types';
import { useAddLeekscriptAI } from '../../../../hooks/leekscript-ai/useAddLeekscriptAI';
import { useAnalyzeAIFile } from '../../../../hooks/leekscript-ai/useAnalyzeAIFile';

const CreateAI: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<IFileListItem | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [existingHash, setExistingHash] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    success: boolean;
    errorCount?: number;
  } | null>(null);

  const analyzeMutation = useAnalyzeAIFile();
  const addAiMutation = useAddLeekscriptAI();

  // Auto-fill name from file name
  useEffect(() => {
    if (selectedFile && !name) {
      const fileNameWithoutExtension = selectedFile.name.replace(
        /\.[^/.]+$/,
        '',
      );
      setName(fileNameWithoutExtension);
    }
  }, [selectedFile, name]);

  const onSelectedFileChange = (file: IFileListItem | null) => {
    setSelectedFile(file);
    setName('');
    setAnalyzeError(null);
    setCreateError(null);
    setExistingHash(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setAnalyzeError(null);
    setIsAnalyzing(true);
    try {
      const result = await analyzeMutation.mutateAsync({
        aiFilePath: selectedFile.path,
      });
      setAnalysisResult(result);
      if (!result.success) {
        setAnalyzeError(`Analysis failed with ${result.errorCount} errors.`);
      }
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCreate = async () => {
    if (!selectedFile || !name) {
      setCreateError('Name and file selection are required.');
      return;
    }

    setCreateError(null);
    setExistingHash(null);
    try {
      const result = await addAiMutation.mutateAsync({
        aiFilePath: selectedFile.path,
        name,
        description,
      });

      if (result.success) {
        console.log(result);
        navigate(`/ais/${result.mergedCodeHash}`);
      } else {
        console.log(result);
        setCreateError(result.message || 'Failed to add AI');
        if (result.mergedCodeHash) {
          setExistingHash(result.mergedCodeHash);
        }
      }
    } catch (err) {
      console.log(err);
      setCreateError(err instanceof Error ? err.message : 'Creation failed');
    }
  };

  const isPending = addAiMutation.isPending;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Register New AI</h1>
        <p style={styles.subtitle}>
          Select a LeekScript file to analyze and add it to your registered AIs.
        </p>
      </header>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Step 1: Select LeekScript File</h2>
        <FileBrowser
          onFileSelect={onSelectedFileChange}
          selectedFile={selectedFile}
        />
        {selectedFile && (
          <div style={styles.selectedFile}>Selected: {selectedFile.path}</div>
        )}
        <div style={styles.actions}>
          <Button
            onClick={handleAnalyze}
            variant="secondary"
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing ? <Spinner size="small" /> : 'Analyze File'}
          </Button>
          {analyzeError && <p style={styles.errorText}>{analyzeError}</p>}
        </div>
        {analysisResult && analysisResult.success && (
          <p style={{ color: '#4ec9b0', margin: 0, fontSize: '0.9rem' }}>
            ✓ File is valid LeekScript.
          </p>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Step 2: AI Details</h2>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>AI Name</label>
            <Input
              value={name}
              onChange={setName}
              placeholder="e.g. DeepBlue"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description (Optional)</label>
            <Input
              value={description}
              onChange={setDescription}
              placeholder="What does this AI do?"
            />
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        <Button
          onClick={handleCreate}
          variant="primary"
          disabled={!selectedFile || !name || isPending || isAnalyzing}
        >
          {isPending ? 'Creating...' : 'Register AI'}
        </Button>
        <Button
          onClick={() => navigate('/ais')}
          variant="secondary"
          disabled={isPending}
        >
          Cancel
        </Button>
        {createError && (
          <p style={styles.errorText}>
            {createError}
            {existingHash && (
              <span
                style={styles.link}
                onClick={() => navigate(`/ais/${existingHash}`)}
              >
                View existing AI
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAI;
