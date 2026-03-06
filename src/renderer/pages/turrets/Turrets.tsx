import { useNavigate } from 'react-router-dom';

function Turrets() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/new-turret')}>Create Turret</button>
      Turrets
    </div>
  );
}

export default Turrets;
