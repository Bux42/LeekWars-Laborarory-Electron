import { useState } from 'react';
import { Input, Modal, Result } from 'antd';
import { IRenameModalProps } from './RenameModal.types';

function RenameModal({
  isOpen,
  onClose,
  onRename,
  currentName: initialName,
  title,
  errorMessage,
  confirmLoading,
}: IRenameModalProps) {
  const [currentName, setCurrentName] = useState(initialName);

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={() => onRename(currentName)}
      confirmLoading={confirmLoading}
      onCancel={onClose}
    >
      <Input
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
      />
      {errorMessage && <Result status="error" title={errorMessage} />}
    </Modal>
  );
}

export default RenameModal;
