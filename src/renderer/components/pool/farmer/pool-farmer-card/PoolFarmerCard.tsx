import { IFarmerPoolCardProps } from './PoolFarmerCard.types';

function PoolFarmerCard({ farmerPool }: IFarmerPoolCardProps) {
  return (
    <div>
      <h2>{farmerPool.basePool.name}</h2>
      <p>Pool ID: {farmerPool.id}</p>
      {/* Add more details about the farmer pool as needed */}
      {farmerPool.farmers.map((farmer) => (
        <div key={farmer.id}>
          <p>Farmer: {farmer.name}</p>
          {/* Add more details about the farmer if needed */}
        </div>
      ))}
    </div>
  );
}

export default PoolFarmerCard;
