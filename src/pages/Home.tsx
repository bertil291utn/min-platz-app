import { useBloqueInfo } from '../contexts/BloqueInfoContext';
import './Home.css';

const Home: React.FC = () => {
  const {bloques }=useBloqueInfo();
  return (
    <div>

      <h2>Welcome to Listen Now</h2>
      <p> {JSON.stringify(bloques)}</p>

    </div>
  );
};

export default Home;
