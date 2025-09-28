import { Dashboard } from './components/Dashboard';
import { mockBatteryData } from './data/mockData';

function App() {
  return <Dashboard data={mockBatteryData} />;
}

export default App
