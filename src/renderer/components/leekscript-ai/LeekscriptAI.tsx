import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ILeekscriptAIProps } from './LeekscriptAI.types';
import styles from './LeekscriptAI.styles';
import GitInfos from './git-infos/GitInfos';
import RenameModal from '../modals/rename-modal/RenameModal';
import { usePutAiIdRename } from '../../../services/ai/ai';

function LeekscriptAI({ leekscriptAI }: ILeekscriptAIProps) {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameError, setRenameError] = useState<string | undefined>(undefined);
  const [isRenaming, setIsRenaming] = useState(false);
  const [leekscriptAIName, setLeekscriptAIName] = useState(leekscriptAI.name);

  const renameAIMutation = usePutAiIdRename();

  const onRenameAI = async (newName: string) => {
    setIsRenaming(true);
    try {
      await renameAIMutation.mutateAsync({
        id: leekscriptAI.id!,
        data: { newName },
      });
      setLeekscriptAIName(newName);
      setShowRenameModal(false);
    } catch (err) {
      setRenameError(
        err instanceof Error ? err.message : 'Failed to rename AI',
      );
    }
    setIsRenaming(false);
  };

  return (
    <div
      style={styles.container}
      id={leekscriptAI.id ? `leekscript-ai-${leekscriptAI.id}` : undefined}
    >
      <div>
        <div style={styles.header}>
          <h3 style={styles.mainTitle}>{leekscriptAIName ?? 'Unnamed AI'}</h3>
          <Button
            onClick={() => setShowRenameModal(true)}
            shape="circle"
            icon={<EditOutlined />}
          />
        </div>
        <div style={styles.metadataContainer}>
          <div style={{ ...styles.metadataItem, gridColumn: '1 / -1' }}>
            <span style={styles.label}>Description</span>
            <span style={styles.value}>
              {leekscriptAI.description || 'No description provided.'}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Git Information</h3>
        <GitInfos gitInfos={leekscriptAI.gitInfos} />
      </div>
      {showRenameModal && (
        <RenameModal
          currentName={leekscriptAIName || ''}
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          title="Rename AI"
          onRename={onRenameAI}
          errorMessage={renameError}
          confirmLoading={isRenaming}
        />
      )}
    </div>
  );
}

export default LeekscriptAI;
