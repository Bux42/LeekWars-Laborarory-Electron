import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { duelPoolCreationStyles as styles } from './DuelPoolCreation.styles';
import { useAddPoolDuel } from '../../../../../hooks/pools/duel/useAddPoolDuel';
import { useLeeks } from '../../../../../hooks/leeks/useLeeks';
import LeekPicker from '../../../../components/leek/leek-picker/LeekPicker';
import Input from '../../../../components/shared/input/Input';
import Button from '../../../../components/shared/button/Button';
import Spinner from '../../../../components/shared/spinner/Spinner';
import Toggle from '../../../../components/shared/toggle/Toggle';
import { usePoolFightEstimation } from '../../../../../hooks/pools/duel/usePoolFightEstimation';
import LeekList from '../../../../components/leek/leek-list/LeekList';
import { IDropdownItem } from '../../../../components/shared/dropdown/Dropdown.types';
import { usePostDuelPoolsCreate } from '../../../../../services/duel-pools/duel-pools';
import { useGetLeeksAll } from '../../../../../services/leeks/leeks';
import { LeekResponse } from '../../../../../services/leekwarsToolsAPI.schemas';

function DuelPoolCreation() {
  const navigate = useNavigate();
  // const addPoolMutation = useAddPoolDuel();
  const createPoolDuelMutation = usePostDuelPoolsCreate();

  const {
    data,
    isLoading: leeksLoading,
    error: leeksError,
  } = useGetLeeksAll({
    query: {
      queryKey: ['leeks'],
    },
  });

  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [resetElo, setResetElo] = useState(true);
  const [deterministic, setDeterministic] = useState(false);
  const [startSeed, setStartSeed] = useState(1);
  const [fightLimitEnabled, setFightLimitEnabled] = useState(true);
  const [fightLimit, setFightLimit] = useState(10);
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
    if (!name) {
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
          basePoolRequest: {
            deterministic,
            enabled,
            fightLimit,
            fightLimitEnabled,
            name,
            resetElo,
            startSeed,
          },
          leekIds: selectedLeekIds,
        },
        // name,
        // enabled,
        // resetElo,
        // deterministic,
        // startSeed,
        // fightLimitEnabled,
        // fightLimit,
        // leekIds: selectedLeekIds,
      });

      if (result) {
        navigate('/pools/duels');
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

  const onFightLimitChange = (value: string) => {
    // 1 fight min
    const fightLimit = Math.max(1, Number(value));
    setFightLimit(fightLimit);
  };

  const onSeedChange = (value: string) => {
    // 0 seed min
    const seed = Math.max(0, Number(value));
    setStartSeed(seed);
  };

  const getDropdownItems = (leek: LeekResponse): IDropdownItem[] => [
    {
      label: 'Delete',
      onClick: () => handleRemoveLeek(leek.id),
      variant: 'danger',
    },
  ];

  const isSubmitting = createPoolDuelMutation.isPending;

  const { totalScenarios, totalFights } = usePoolFightEstimation(
    selectedLeekIds.length,
    fightLimit,
  );

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Duel Pool</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>General Information</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Pool Name</label>
            <Input
              placeholder="Enter pool name"
              value={name}
              onChange={setName}
            />
          </div>
          <div style={styles.column}>
            <label style={styles.checkboxGroup}>
              <Toggle
                checked={enabled}
                onChange={(checked) => setEnabled(checked)}
              />
              <span style={styles.checkboxLabel}>Enabled</span>
            </label>
            <label style={styles.checkboxGroup}>
              <Toggle
                checked={resetElo}
                onChange={(checked) => setResetElo(checked)}
              />
              <span style={styles.checkboxLabel}>Reset ELO on start</span>
            </label>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Simulation Settings</h2>
          <div style={styles.column}>
            <label style={styles.checkboxGroup}>
              <Toggle
                checked={deterministic}
                onChange={(checked) => setDeterministic(checked)}
              />
              <span style={styles.checkboxLabel}>Deterministic</span>
            </label>
            {deterministic && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Start Seed</label>
                <Input
                  type="number"
                  value={startSeed}
                  onChange={onSeedChange}
                />
              </div>
            )}
          </div>
          <div style={styles.column}>
            <label style={styles.checkboxGroup}>
              <Toggle
                checked={fightLimitEnabled}
                onChange={(checked) => setFightLimitEnabled(checked)}
              />
              <span style={styles.checkboxLabel}>Fight Limit</span>
            </label>
            {fightLimitEnabled && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Fights per Pair</label>
                <Input
                  type="number"
                  disabled={!fightLimitEnabled}
                  value={fightLimit}
                  onChange={onFightLimitChange}
                />
                <div style={styles.statsContainer}>
                  Total estimated fights: {totalFights} ({totalScenarios} duel
                  combinations x {fightLimit || 1} fights)
                </div>
              </div>
            )}
          </div>
        </div>

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
