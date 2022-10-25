import './App.css';
import { Backdrop } from './Pages/Home';
import Outline from './Components/Layout/Outline';
import { useSelector } from 'react-redux';
import LeaseList from './Components/Beats/Leases/LeaseList';
import AnimatedRoutes from './Components/UI/AnimatedRoutes';

function App() {
  const checkPricing = useSelector((state) => state.cart.checkPricing);

  return (
    <div className="App">
      <Backdrop />
      <Outline>
        <AnimatedRoutes />
      </Outline>

      <div className='list'>
        {checkPricing && <LeaseList />}
      </div>
    </div>
  );
}

export default App;
