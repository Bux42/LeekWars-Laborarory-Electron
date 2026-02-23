import { useEffect } from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { usePostGitStatusPorcelain } from '../../../../services/git/git';
import { statusPorcelainStyles as styles } from './StatusPorcelain.styles';
import { IStatusPorcelainProps } from './StatusPorcelain.types';

function StatusPorcelain({ onPorcelainChecked, path }: IStatusPorcelainProps) {
  const { mutate, isPending, isSuccess, data } = usePostGitStatusPorcelain({
    mutation: {
      onSuccess: (response) => {
        const items = response.items ?? [];
        onPorcelainChecked(items.length === 0);
      },
      onError: () => {
        onPorcelainChecked(false);
      },
    },
  });

  useEffect(() => {
    if (!path) {
      onPorcelainChecked(false);
      return;
    }

    mutate({ data: { filePath: path } });
  }, [mutate, onPorcelainChecked, path]);

  if (isPending) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="small" />
      </div>
    );
  }

  if (!isSuccess) {
    return null;
  }

  const items = data.items ?? [];

  if (items.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.successState}>
          <CheckCircleFilled style={styles.successIcon} />
          <span style={styles.successText}>No pending changes</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.errorState}>
        <CloseCircleFilled style={styles.errorIcon} />
        <span style={styles.errorText}>Pending changes detected</span>
      </div>
      <div style={styles.list}>
        {items.map((item) => (
          <div
            key={`${item.path || 'unknown'}-${item.status || 'unknown'}`}
            style={styles.item}
          >
            <span style={styles.itemPath}>{item.path || '-'}</span>
            <span style={styles.itemStatus}>{item.status || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusPorcelain;
