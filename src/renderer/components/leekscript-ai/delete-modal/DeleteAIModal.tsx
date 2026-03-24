import { Modal, Tree, TreeDataNode } from 'antd';
import { IDeleteAIModalProps } from './DeleteAIModal.types';
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';

function DeleteAIModal({
  title,
  isOpen,
  onClose,
  confirmLoading,
}: IDeleteAIModalProps) {
  const treeData: TreeDataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <SmileOutlined />,
      children: [
        {
          title: 'leaf',
          key: '0-0-0',
          icon: <MehOutlined />,
        },
        {
          title: 'leaf',
          key: '0-0-1',
          icon: ({ selected }) =>
            selected ? <FrownFilled /> : <FrownOutlined />,
        },
      ],
    },
  ];

  return (
    <Modal
      title={title}
      open={isOpen}
      confirmLoading={confirmLoading}
      onCancel={onClose}
    >
      <p>
        Are you sure you want to delete this AI? This action cannot be undone.
      </p>
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={['0-0-0']}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
      />
    </Modal>
  );
}

export default DeleteAIModal;
