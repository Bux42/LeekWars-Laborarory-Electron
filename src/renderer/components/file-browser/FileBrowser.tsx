import React, { useState, useEffect } from 'react';
import { fileBrowserStyles as styles } from './FileBrowser.styles';
import { IFileBrowserProps } from './FileBrowser.types';
import { IFileListItem } from '../../../services/FileService/requests/FileList.types';
import { useFileList } from '../../../hooks/files/useFileList';
import { useResetFiles } from '../../../hooks/files/useResetFiles';
import { theme } from '../../theme';

function FileBrowser({ onFileSelect, selectedFile }: IFileBrowserProps) {
  const [currentPath, setCurrentPath] = useState<string>('.');

  const {
    data: files = [],
    isLoading: loading,
    error,
    refetch,
  } = useFileList(currentPath);

  const resetMutation = useResetFiles();

  const handleFileClick = (file: IFileListItem) => {
    if (file.directory) {
      setCurrentPath(file.path);
    } else {
      onFileSelect(file);
    }
  };

  const handleHomeClick = async () => {
    try {
      await resetMutation.mutateAsync();
      setCurrentPath('.');
    } catch (err) {
      console.error('Failed to reset directory:', err);
    }
  };

  const handleUpClick = () => {
    setCurrentPath('..');
    // If currentPath was already '..', the State update might not trigger a re-fetch if not handled.
    // However, in our useFileList, the key depends on currentPath.
    // If the server-side is stateful, we might need to force a refetch or use a mutation.
    if (currentPath === '..') {
      refetch();
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to fetch files'}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>File Browser</h3>
        <div style={styles.headerButtons}>
          <button
            type="button"
            style={styles.backButton}
            onClick={handleUpClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4e4e4e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.colors.border.primary;
            }}
            disabled={loading}
            aria-label="Go up one directory"
          >
            ⬆️
          </button>
          <button
            type="button"
            style={styles.homeButton}
            onClick={handleHomeClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4e4e4e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.colors.border.primary;
            }}
            disabled={resetMutation.isPending}
            aria-label="Go to home directory"
          >
            🏠
          </button>
        </div>
      </div>
      <div style={styles.fileList}>
        {files.map((file) => {
          const isSelected = selectedFile?.path === file.path;
          return (
            <div
              key={file.path}
              style={isSelected ? styles.fileItemSelected : styles.fileItem}
              onClick={() => handleFileClick(file)}
              onKeyDown={(e) => e.key === 'Enter' && handleFileClick(file)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${file.name}`}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#4e4e4e';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const borderColor = styles.fileItem.border as string;
                  e.currentTarget.style.borderColor = borderColor;
                }
              }}
            >
              <span style={styles.fileIcon}>
                {file.directory ? '📁' : '📄'}
              </span>
              <span style={styles.fileName}>{file.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileBrowser;
