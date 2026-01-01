import React, { useState, useEffect } from 'react';
import { fileBrowserStyles as styles } from './FileBrowser.styles';
import { IFileBrowserProps } from './FileBrowser.types';
import { IFileListItem } from '../../../services/leekwars-laboratory/requests/FileListRequest.types';
import { useServerContext } from '../../../context/server/ServerContext';

function FileBrowser({ onFileSelect, selectedFile }: IFileBrowserProps) {
  const { service } = useServerContext();
  const [files, setFiles] = useState<IFileListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath] = useState<string>('.');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await service.getFileList({
          directory_path: currentPath,
        });
        setFiles(response.files);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [currentPath, service]);

  const handleFileClick = (file: IFileListItem) => {
    if (!file.directory) {
      onFileSelect(file);
    }
    // TODO: Add directory navigation later
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
        <p style={styles.error}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
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
