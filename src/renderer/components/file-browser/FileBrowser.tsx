import React, { useEffect, useRef, useState } from 'react';
import { fileBrowserStyles as styles } from './FileBrowser.styles';
import { IFileBrowserProps } from './FileBrowser.types';
import { IFileListItem } from '../../../services/FileService/requests/FileList.types';
import { theme } from '../../theme';
import {
  useGetFileListAll,
  useGetFileMoveUp,
  useGetFileResetCurrentDirectory,
  usePostFileBrowseFolder,
} from '../../../services/file/file';
import {
  BrowseDirectoryResponse,
  FileInfo,
} from '../../../services/leekwarsToolsAPI.schemas';

function FileBrowser({ onFileSelect, selectedFile }: IFileBrowserProps) {
  const [browseDirectoryResponse, setBrowseDirectoryResponse] =
    useState<BrowseDirectoryResponse | null>(null);
  const fileListRef = useRef<HTMLDivElement | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileListAllQuery = useGetFileListAll();
  const browseFolderMutation = usePostFileBrowseFolder();
  const moveUpQuery = useGetFileMoveUp({ query: { enabled: false } });
  const resetMutation = useGetFileResetCurrentDirectory({
    query: { enabled: false },
  });

  const currentDirectoryData = browseDirectoryResponse ?? fileListAllQuery.data;
  const isLoading = fileListAllQuery.isLoading && !currentDirectoryData;
  const error =
    errorMessage || (fileListAllQuery.error ? 'Failed to fetch files' : null);

  const handleFileClick = async (file: FileInfo) => {
    if (file.directory) {
      setErrorMessage(null);
      try {
        const response = await browseFolderMutation.mutateAsync({
          data: { directoryPath: file.name },
        });
        setBrowseDirectoryResponse(response);
      } catch {
        setErrorMessage('Failed to browse folder');
      }
    } else {
      onFileSelect(file as unknown as IFileListItem);
    }
  };

  const handleHomeClick = async () => {
    setErrorMessage(null);
    try {
      const response = await resetMutation.refetch();
      if (response.data) {
        setBrowseDirectoryResponse(response.data);
      }
    } catch {
      setErrorMessage('Failed to reset directory');
    }
  };

  const handleUpClick = async () => {
    setErrorMessage(null);
    try {
      const response = await moveUpQuery.refetch();
      if (response.data) {
        setBrowseDirectoryResponse(response.data);
      }
    } catch {
      setErrorMessage('Failed to move up directory');
    }
  };

  const emptyFolder =
    !isLoading && !error && currentDirectoryData?.files?.length === 0;

  useEffect(() => {
    if (fileListRef.current) {
      fileListRef.current.scrollTop = 0;
    }
  }, [currentDirectoryData?.currentDirectory]);

  const onButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = theme.colors.border.secondary;
  };

  const onButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = theme.colors.border.primary;
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>{currentDirectoryData?.currentDirectory || 'File Browser'}</h3>
        <div style={styles.headerButtons}>
          <button
            type="button"
            style={styles.backButton}
            onClick={handleUpClick}
            onMouseEnter={onButtonMouseEnter}
            onMouseLeave={onButtonMouseLeave}
            disabled={moveUpQuery.isFetching || isLoading}
            aria-label="Go up one directory"
          >
            ⬆️
          </button>
          <button
            type="button"
            style={styles.homeButton}
            onClick={handleHomeClick}
            onMouseEnter={onButtonMouseEnter}
            onMouseLeave={onButtonMouseLeave}
            disabled={resetMutation.isFetching || isLoading}
            aria-label="Go to home directory"
          >
            🏠
          </button>
        </div>
      </div>
      <div style={styles.fileList} ref={fileListRef}>
        {emptyFolder && <p>This folder is empty</p>}
        {currentDirectoryData?.files?.map((file) => {
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
                  e.currentTarget.style.borderColor =
                    theme.colors.border.secondary;
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
