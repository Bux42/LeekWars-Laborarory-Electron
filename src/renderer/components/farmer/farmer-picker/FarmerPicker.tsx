import React from 'react';
import { theme } from '../../../theme';
import { farmerPickerStyles as styles } from './FarmerPicker.styles';
import { IFarmerPickerProps } from './FarmerPicker.types';
import { useGetFarmersAll } from '../../../../services/farmers/farmers';

function FarmerPicker({
  label,
  selectedFarmerIds,
  onFarmerSelect,
}: IFarmerPickerProps) {
  const {
    data: farmersData,
    isLoading: farmersLoading,
    error: farmersError,
  } = useGetFarmersAll({
    query: {
      queryKey: ['farmers'],
    },
  });

  const filteredFarmers =
    farmersData?.farmers.filter(
      (farmer) => !selectedFarmerIds.includes(farmer.id),
    ) ?? [];

  if (farmersLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.title}>{label}</div>
        <p style={styles.emptyText}>Loading farmers...</p>
      </div>
    );
  }

  if (farmersError) {
    return (
      <div style={styles.container}>
        <div style={styles.title}>{label}</div>
        <p style={styles.emptyText}>Error loading farmers.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.title}>{label}</div>
      {filteredFarmers.length === 0 ? (
        <p style={styles.emptyText}>
          No more farmers available. All farmers are already in this pool.
        </p>
      ) : (
        <div style={styles.farmersGrid}>
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              style={styles.farmerCard}
              onClick={() => onFarmerSelect(farmer.id)}
              onKeyDown={(e) => e.key === 'Enter' && onFarmerSelect(farmer.id)}
              role="button"
              tabIndex={0}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = theme.colors.accent.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = theme.colors.border.primary;
              }}
            >
              <div style={styles.farmerAvatar}>{farmer.name.charAt(0)}</div>
              <div style={styles.farmerName}>{farmer.name}</div>
              <div style={styles.farmerLeekCount}>
                Leeks: {farmer.leeks?.length ?? 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FarmerPicker;
