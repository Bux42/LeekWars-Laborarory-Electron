import React, { useMemo, useState } from 'react';
import { pumpkinPoolCreationStyles as styles } from './PumpkinPoolCreation.styles';
import { getJson } from '../../../../utils/JsonLoader';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import LeekList from '../../../../components/leek/leek-list/LeekList';
import BasePoolForm from '../../../../components/pool/base/base-pool-form/BasePoolForm';
import { CreateBasePoolRequest } from '../../../../../services/leekwarsToolsAPI.schemas';
import { DEFAULT_BASE_POOL } from '../../../../constants/pools/Pools.constants';

function PumpkinPoolCreation() {
  const [basePoolRequest, setBasePoolRequest] = useState<CreateBasePoolRequest>(
    { ...DEFAULT_BASE_POOL },
  );
  const [selectedLeekIds, setSelectedLeekIds] = useState<string[]>([]);

  const bossNames = ['evil_pumpkin', 'hubbard', 'turban', 'warty', 'offspring'];
  const bossData = bossNames.map((name) => getJson(`builds/pumpkin/${name}`));

  const {
    data,
    isLoading: leeksLoading,
    error: leeksError,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const availableLeeks = useMemo(() => {
    if (!data) return [];
    const poolLeekIds = new Set(selectedLeekIds);
    return data.leeks.filter((leek) => !poolLeekIds.has(leek.id));
  }, [data, selectedLeekIds]);

  const handleLeekSelect = (leekId: string) => {
    if (!selectedLeekIds.includes(leekId)) {
      setSelectedLeekIds([...selectedLeekIds, leekId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Pumpkin Pool</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <BasePoolForm
          selectedLeeksCount={selectedLeekIds.length}
          initialBasePoolRequest={basePoolRequest}
          onBasePoolRequestChange={setBasePoolRequest}
        />
        <h3 style={styles.title}>Step 1: Select the mobs</h3>
      </form>
      <div>
        <h3 style={styles.title}>Step 2: Select participating leeks</h3>
        <h3>Available leeks ({availableLeeks.length})</h3>
        <LeekList leeks={availableLeeks} onAddLeek={handleLeekSelect} />
      </div>
    </div>
  );
}

export default PumpkinPoolCreation;
