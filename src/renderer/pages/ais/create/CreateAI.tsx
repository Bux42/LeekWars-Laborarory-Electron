import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAiStyles as styles } from './CreateAI.styles';
import FileBrowser from '../../../components/file-browser/FileBrowser';
import Input from '../../../components/shared/input/Input';
import Button from '../../../components/shared/button/Button';
import Spinner from '../../../components/shared/spinner/Spinner';
import { IFileListItem } from '../../../../services/FileService/requests/FileList.types';
import { usePostAiAdd, usePostAiAnalyze } from '../../../../services/ai/ai';
import CheckGit from '../../../components/git/check-git/CheckGit';
import StatusPorcelain from '../../../components/git/status-porcelain/StatusPorcelain';

function CreateAI() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<IFileListItem | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createPending, setCreatePending] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    success: boolean;
    errorCount?: number;
  } | null>(null);
  const [validGit, setValidGit] = useState<boolean | null>(null);
  const [validPorcelain, setValidPorcelain] = useState<boolean | null>(null);

  const analyzeMutation = usePostAiAnalyze();
  const addAiMutation = usePostAiAdd();

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
    setExistingId(null);
    setAnalysisResult(null);
  };

  const analyzeAIFile = useCallback(async (filePath: string) => {
    setAnalyzeError(null);
    setIsAnalyzing(true);
    try {
      const result = await analyzeMutation.mutateAsync({
        data: { filePath },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnalyze = useCallback(() => {
    if (selectedFile) {
      analyzeAIFile(selectedFile.path);
    }
  }, [analyzeAIFile, selectedFile]);

  useEffect(() => {
    if (!selectedFile) return;
    handleAnalyze();
  }, [handleAnalyze, selectedFile]);

  const handleCreate = async () => {
    if (!selectedFile || !name) {
      setCreateError('Name and file selection are required.');
      return;
    }

    setCreateError(null);
    setCreatePending(true);
    setExistingId(null);
    try {
      const result = await addAiMutation.mutateAsync({
        data: {
          relativeFilePath: selectedFile.path,
          name,
          description,
        },
      });

      if (result.ai?.id) {
        navigate(`/ai/${result.ai.id}`);
      } else {
        navigate('/ais');
      }
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Creation failed');
    } finally {
      setCreatePending(false);
    }
  };

  const validFile: boolean = useMemo(() => {
    if (!selectedFile) return false;
    if (isAnalyzing) return false;
    if (analysisResult === null) return false;
    return analysisResult.success;
  }, [selectedFile, isAnalyzing, analysisResult]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Register New AI</h1>
        <p style={styles.subtitle}>
          Select a LeekScript main file to analyze and add it to your registered
          AIs.
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
        <h2 style={styles.sectionTitle}>Step 2: Git status</h2>
        {selectedFile && (
          <>
            <CheckGit path={selectedFile.path} onGitChecked={setValidGit} />
            <StatusPorcelain
              path={selectedFile.path}
              onPorcelainChecked={setValidPorcelain}
            />
          </>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Step 3: AI Details</h2>
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
          disabled={!validFile || createPending}
        >
          {createPending ? 'Creating...' : 'Register AI'}
        </Button>
        <Button
          onClick={() => navigate('/ais')}
          variant="secondary"
          disabled={createPending}
        >
          Cancel
        </Button>
        {createError && (
          <p style={styles.errorText}>
            {createError}
            {existingId && (
              <span
                style={styles.link}
                onClick={() => navigate(`/ai/${existingId}`)}
              >
                View existing AI
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default CreateAI;
