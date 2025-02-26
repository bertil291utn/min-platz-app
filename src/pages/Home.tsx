import { useBloqueInfo } from '../contexts/BloqueInfoContext';
import './Home.css';

const Home: React.FC = () => {
  const {bloqueInfo }=useBloqueInfo();
  return (
    <div>

      <h2>Welcome to Listen Now</h2>
      <p>tengo {bloqueInfo} bloques</p>

    </div>
  );
};

export default Home;
