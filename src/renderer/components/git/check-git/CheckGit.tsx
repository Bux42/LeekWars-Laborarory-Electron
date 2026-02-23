import { useEffect } from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { usePostGitCheckPath } from '../../../../services/git/git';
import { checkGitStyles as styles } from './CheckGit.styles';
import { ICheckGitProps } from './CheckGit.types';

function CheckGit({ onGitChecked, path }: ICheckGitProps) {
  const { mutate, isPending, isSuccess, data } = usePostGitCheckPath({
    mutation: {
      onSuccess: (response) => {
        onGitChecked(response.exists);
      },
      onError: () => {
        onGitChecked(false);
      },
    },
  });

  useEffect(() => {
    if (!path) {
      onGitChecked(false);
      return;
    }

    mutate({ data: { filePath: path } });
  }, [mutate, onGitChecked, path]);

  if (isPending) {
    return (
      <div style={styles.container}>
        <Spin size="small" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div style={styles.container}>
        {data.exists ? (
          <>
            <CheckCircleFilled style={styles.iconSuccess} />
            <span style={styles.successText}>
              File is inside git repository
            </span>
          </>
        ) : (
          <>
            <CloseCircleFilled style={styles.iconError} />
            <span style={styles.errorText}>
              File is not inside git repository
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <CloseCircleFilled style={styles.iconError} />
      <span style={styles.errorText}>File is not inside git repository</span>
    </div>
  );
}

export default CheckGit;
