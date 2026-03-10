import React, { useMemo, useState } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CreateBasePoolRequest } from '../../../../../services/leekwarsToolsAPI.schemas';
import { DEFAULT_BASE_POOL } from '../../../../constants/pools/Pools.constants';
import { teamPoolCreationStyles as styles } from './TeamPoolCreation.styles';
import Button from '../../../../components/shared/button/Button';
import BasePoolForm from '../../../../components/pool/base/base-pool-form/BasePoolForm';
import TeamPicker from '../../../../components/team/team-picker/TeamPicker';
import { useGetTeamsAll } from '../../../../../services/teams/teams';
import { usePostTeamPoolsCreate } from '../../../../../services/team-pools/team-pools';
import Spinner from '../../../../components/shared/spinner/Spinner';

function TeamPoolCreation() {
  const navigate = useNavigate();
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [teamPickerError, setTeamPickerError] = useState<string | null>(
    'You must select at least 2 teams',
  );

  const {
    data: teamsData,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
  } = useGetTeamsAll();

  const createPoolTeamMutation = usePostTeamPoolsCreate();

  const selectedTeams = useMemo(
    () =>
      teamsData?.teams.filter((team) => selectedTeamIds.includes(team.id)) ||
      [],
    [teamsData, selectedTeamIds],
  );

  const [basePoolRequest, setBasePoolRequest] = useState<CreateBasePoolRequest>(
    { ...DEFAULT_BASE_POOL },
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!basePoolRequest.name?.trim()) {
      setError('Pool name is required');
      return;
    }

    if (selectedTeamIds.length < 2) {
      setError('At least 2 teams are required for a team pool');
      return;
    }

    try {
      setError(null);
      const result = await createPoolTeamMutation.mutateAsync({
        data: {
          basePoolRequest,
          teamIds: selectedTeamIds,
        },
      });

      if (result) {
        navigate('/pools/team');
      } else {
        setError('Failed to create pool');
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'An error occurred',
      );
    }
  };

  const handleTeamSelect = (teamId: string) => {
    if (!selectedTeamIds.includes(teamId)) {
      const updatedSelectedTeamIds = [...selectedTeamIds, teamId];
      setSelectedTeamIds(updatedSelectedTeamIds);

      if (updatedSelectedTeamIds.length >= 2) {
        setTeamPickerError(null);
      }
    }
  };

  const handleRemoveTeam = (teamId: string) => {
    const updatedSelectedTeamIds = selectedTeamIds.filter(
      (id) => id !== teamId,
    );
    setSelectedTeamIds(updatedSelectedTeamIds);

    if (updatedSelectedTeamIds.length < 2) {
      setTeamPickerError('You must select at least 2 teams');
    }
  };

  const isSubmitting = createPoolTeamMutation.isPending;

  if (isLoadingTeams) {
    return <Spinner size="small" label="Loading teams..." />;
  }

  if (isErrorTeams) {
    return <Result status="error" title="Error loading teams" />;
  }

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Team Pool</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <BasePoolForm
          selectedLeeksCount={selectedTeamIds.length}
          initialBasePoolRequest={basePoolRequest}
          onBasePoolRequestChange={setBasePoolRequest}
        />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Select Teams</h2>
          {teamPickerError && <p style={styles.error}>{teamPickerError}</p>}

          <div style={styles.selectedTeamsContainer}>
            {selectedTeamIds.length === 0 ? (
              <span style={styles.noTeamSelected}>No teams selected yet.</span>
            ) : (
              selectedTeams.map((team) => (
                <div key={team.id} style={styles.selectedTeamItem}>
                  <span style={styles.selectedTeamName}>{team.name}</span>
                  <Button
                    onClick={() => handleRemoveTeam(team.id)}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>

          <TeamPicker
            label="Add Team to Pool"
            availableTeams={teamsData?.teams || []}
            selectedTeamIds={selectedTeamIds}
            onTeamSelect={handleTeamSelect}
          />
        </div>

        {error && <Result status="error" title={error} />}

        <div style={styles.actions}>
          <Button
            variant="primary"
            disabled={isSubmitting || selectedTeamIds.length < 2}
            type="submit"
          >
            {isSubmitting ? 'Creating...' : 'Create Pool'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TeamPoolCreation;
