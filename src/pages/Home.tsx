import { useCount } from '../contexts/CountContext';
import './Home.css';

const Home: React.FC = () => {
  const {count }=useCount();
  return (
    <div>

      <h2>Welcome to Listen Now</h2>
      <p>tengo {count} bloques</p>

    </div>
  );
};

export default Home;
