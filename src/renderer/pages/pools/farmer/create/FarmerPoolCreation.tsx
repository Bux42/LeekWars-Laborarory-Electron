import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { farmerPoolCreationStyles as styles } from './FarmerPoolCreation.styles';
import BasePoolForm from '../../../../components/pool/base/base-pool-form/BasePoolForm';
import FarmerPicker from '../../../../components/farmer/farmer-picker/FarmerPicker';
import Button from '../../../../components/shared/button/Button';
import { usePostFarmerPoolsCreate } from '../../../../../services/farmer-pools/farmer-pools';
import { useGetFarmersAll } from '../../../../../services/farmers/farmers';
import { CreateBasePoolRequest } from '../../../../../services/leekwarsToolsAPI.schemas';

function FarmerPoolCreation() {
  const navigate = useNavigate();
  const createPoolFarmerMutation = usePostFarmerPoolsCreate();

  const { data: farmersData } = useGetFarmersAll({
    query: {
      queryKey: ['farmers'],
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
  const [selectedFarmerIds, setSelectedFarmerIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [farmerPickerError, setFarmerPickerError] = useState<string | null>(
    'You must select at least 2 farmers',
  );

  const handleFarmerSelect = (farmerId: string) => {
    if (!selectedFarmerIds.includes(farmerId)) {
      const updatedSelectedFarmerIds = [...selectedFarmerIds, farmerId];
      setSelectedFarmerIds(updatedSelectedFarmerIds);

      if (updatedSelectedFarmerIds.length >= 2) {
        setFarmerPickerError(null);
      }
    }
  };

  const handleRemoveFarmer = (farmerId: string) => {
    const updatedSelectedFarmerIds = selectedFarmerIds.filter(
      (id) => id !== farmerId,
    );
    setSelectedFarmerIds(updatedSelectedFarmerIds);

    if (updatedSelectedFarmerIds.length < 2) {
      setFarmerPickerError('You must select at least 2 farmers');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!basePoolRequest.name?.trim()) {
      setError('Pool name is required');
      return;
    }

    if (selectedFarmerIds.length < 2) {
      setError('At least 2 farmers are required for a farmer pool');
      return;
    }

    try {
      setError(null);
      const result = await createPoolFarmerMutation.mutateAsync({
        data: {
          basePoolRequest,
          farmerIds: selectedFarmerIds,
        },
      });

      if (result) {
        navigate('/pools/farmer');
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

  const selectedFarmers = (farmersData?.farmers || []).filter((farmer) =>
    selectedFarmerIds.includes(farmer.id),
  );

  const isSubmitting = createPoolFarmerMutation.isPending;

  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Create New Farmer Pool</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <BasePoolForm
          selectedLeeksCount={selectedFarmerIds.length}
          initialBasePoolRequest={basePoolRequest}
          onBasePoolRequestChange={setBasePoolRequest}
        />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Select Farmers</h2>
          {farmerPickerError && <p style={styles.error}>{farmerPickerError}</p>}

          <div style={styles.selectedFarmersContainer}>
            {selectedFarmerIds.length === 0 ? (
              <span style={styles.noFarmerSelected}>
                No farmers selected yet.
              </span>
            ) : (
              selectedFarmers.map((farmer) => (
                <div key={farmer.id} style={styles.selectedFarmerItem}>
                  <span style={styles.selectedFarmerName}>{farmer.name}</span>
                  <Button
                    onClick={() => handleRemoveFarmer(farmer.id)}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>

          <FarmerPicker
            label="Add Farmer to Pool"
            selectedFarmerIds={selectedFarmerIds}
            onFarmerSelect={handleFarmerSelect}
          />
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

export default FarmerPoolCreation;
