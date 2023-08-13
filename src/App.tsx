import PlanetTable from './components/PlanetTable';

import styles from './App.module.css';
import FilterPlanet from './components/FilterPlanet';
import { PlanetsProvider } from './context/PlanetsProvider';

function App() {
  return (
    <main className={ styles.main }>
      <PlanetsProvider>
        <FilterPlanet />
        <PlanetTable />
      </PlanetsProvider>
    </main>
  );
}

export default App;
