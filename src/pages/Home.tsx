import { useBloqueInfo } from '../contexts/BloqueInfoContext';
import './Home.css';

const Home: React.FC = () => {
  const {bloques }=useBloqueInfo();
  return (
    <div>

      <p> {JSON.stringify(bloques)}</p>

    </div>
  );
};

export default Home;
