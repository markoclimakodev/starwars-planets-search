import PlanetTable from './components/PlanetTable';
import { PlanetsProvider } from './context/PlanetsProvider';

import './App.module.css';

function App() {
  return (
    <PlanetsProvider>
      <PlanetTable />
    </PlanetsProvider>
  );
}

export default App;
