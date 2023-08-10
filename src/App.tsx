import { useEffect, useState } from 'react';
import { fetchPlanets } from './Api/fetchPlanets';
import './App.css';
import Table from './components/Table';
import { PlanetsProvider } from './context/planetsProvider';
import { Planet } from './types';

function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      const planetsResponse = await fetchPlanets();
      setPlanets(planetsResponse);
    };
    fetchApi();
  }, []);

  const providerValues = {
    planets,
  };
  return (
    <PlanetsProvider value={ providerValues }>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
