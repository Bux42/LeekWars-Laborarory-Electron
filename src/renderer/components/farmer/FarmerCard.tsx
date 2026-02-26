import { IFarmerCardProps } from './FarmerCard.types';

function FarmerCard({ farmer }: IFarmerCardProps) {
  return (
    <div>
      <h2>{farmer.name}</h2>
      <p>Created on: {new Date(farmer.creationDate).toLocaleDateString()}</p>
      <p>
        Last updated: {new Date(farmer.lastUpdateDate).toLocaleDateString()}
      </p>
      <p>Number of leeks: {farmer.leeks.length}</p>
    </div>
  );
}

export default FarmerCard;
