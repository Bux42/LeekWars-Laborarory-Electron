import React from 'react';
import FarmerCard from '../farmer-card/FarmerCard';
import { farmerListStyles as styles } from './FarmerList.styles';
import { IFarmerListProps } from './FarmerList.types';

function FarmerList({ farmers }: IFarmerListProps) {
  if (farmers.length === 0) {
    return <p style={styles.emptyText}>No farmers available.</p>;
  }

  return (
    <div style={styles.container}>
      {farmers.map((farmer, index) => (
        <FarmerCard
          key={farmer.id ?? `${farmer.name ?? 'farmer'}-${index}`}
          farmer={farmer}
        />
      ))}
    </div>
  );
}

export default FarmerList;
