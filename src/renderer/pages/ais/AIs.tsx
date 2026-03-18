import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { aisStyles as styles } from './AIs.styles';
import Button from '../../components/shared/button/Button';
import LeekscriptAI from '../../components/leekscript-ai/LeekscriptAI';
import Spinner from '../../components/shared/spinner/Spinner';
import { useGetAiList } from '../../../services/ai/ai';

function AIs() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAiList();

  const ais = data?.ais ?? [];

  const handleAddAI = () => {
    navigate('/ais/create');
  };

  if (isLoading) {
    return <Spinner size="small" label="Loading AIs..." />;
  }

  if (error) {
    return <Result status="error" title="Error loading AIs" />;
  }

  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.title}>All AIs</h1>
        <Button onClick={handleAddAI} variant="primary">
          Add AI
        </Button>
      </header>
      {ais.length === 0 ? (
        <Result
          status="info"
          title="No AIs found"
          subTitle="Click the button above to create your first AI."
        />
      ) : (
        <div style={styles.list}>
          {ais.map((ai) => (
            <div key={ai.id ?? ai.name} style={styles.aiCard}>
              <LeekscriptAI leekscriptAI={ai} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AIs;
