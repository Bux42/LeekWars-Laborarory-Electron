import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { duelPoolCreationStyles as styles } from './DuelPoolCreation.styles';
import LeekPicker from '../../../../components/leek/leek-picker/LeekPicker';
import Button from '../../../../components/shared/button/Button';
import Spinner from '../../../../components/shared/spinner/Spinner';
import LeekList from '../../../../components/leek/leek-list/LeekList';
import { IDropdownItem } from '../../../../components/shared/dropdown/Dropdown.types';
import { usePostDuelPoolsCreate } from '../../../../../services/duel-pools/duel-pools';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import {
  CreateBasePoolRequest,
  LeekResponse,
} from '../../../../../services/leekwarsToolsAPI.schemas';
import BasePoolForm from '../../../../components/pool/base/base-pool-form/BasePoolForm';

function DuelPoolCreation() {
  const navigate = useNavigate();
  const createPoolDuelMutation = usePostDuelPoolsCreate();

  const { data, isLoading: leeksLoading } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const [basePoolRequest, setBasePoolRequest] = useState<CreateBasePoolRequest>(
    {
      deterministic: false,
      enabled: false,
      fightLimit: 10,
      fightLimitEnabled: true,
      name: '',
      resetElo: true,
      startSeed: 1,
    },
  );
  const [selectedLeekIds, setSelectedLeekIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [leekPickerError, setLeekPickerError] = useState<string | null>(
    'You must select at least 2 leeks',
  );

  const handleLeekSelect = (leekId: string) => {
    if (!selectedLeekIds.includes(leekId)) {
      setSelectedLeekIds([...selectedLeekIds, leekId]);
    }
  };

  const handleRemoveLeek = (leekId: string) => {
    setSelectedLeekIds(selectedLeekIds.filter((id) => id !== leekId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!basePoolRequest.name?.trim()) {
      setError('Pool name is required');
      return;
    }
    if (selectedLeekIds.length < 2) {
      setError('At least 2 leeks are required for a duel pool');
      return;
    }

    try {
      setError(null);
      const result = await createPoolDuelMutation.mutateAsync({
        data: {
          basePoolRequest,
          leekIds: selectedLeekIds,
        },
      });

      if (result) {
        navigate('/pools/duel');
      } else {
        setError('Failed to create pool');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    if (selectedLeekIds.length >= 2) {
      setLeekPickerError(null);
    } else {
      setLeekPickerError('You must select at least 2 leeks');
    }
  }, [selectedLeekIds]);

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Delete',
      onClick: () => handleRemoveLeek(leek.id),
      variant: 'danger',
    },
  ];

  const isSubmitting = createPoolDuelMutation.isPending;

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Duel Pool</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <BasePoolForm
          selectedLeeksCount={selectedLeekIds.length}
          initialBasePoolRequest={basePoolRequest}
          onBasePoolRequestChange={setBasePoolRequest}
        />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Select Leeks</h2>
          {leekPickerError && <p style={styles.error}>{leekPickerError}</p>}
          <div style={styles.selectedLeeksContainer}>
            {selectedLeekIds.length === 0 && (
              <span style={styles.noLeekSelected}>No leeks selected yet.</span>
            )}
            {selectedLeekIds.length > 0 && (
              <LeekList
                leeks={(data?.leeks || []).filter((leek) =>
                  selectedLeekIds.includes(leek.id),
                )}
                getDropdownItems={getDropdownItems}
              />
            )}
          </div>
          {leeksLoading ? (
            <Spinner size="small" label="Loading leeks..." />
          ) : (
            <LeekPicker
              label="Add Leek to Pool"
              availableLeeks={data?.leeks || []}
              selectedLeekIds={selectedLeekIds}
              onLeekSelect={handleLeekSelect}
            />
          )}
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.actions}>
          <Button variant="primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Creating...' : 'Create Pool'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DuelPoolCreation;
