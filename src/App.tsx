import { useEffect, useState } from 'react';
import { fetchPlanets } from './Api/fetchPlanets';
import './App.css';
import FilterPlanets from './components/FilterPlanets';
import Table from './components/Table';
import { PlanetsProvider } from './context/planetsProvider';
import { Planet } from './types';

function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);

  const handleFilterPlanet = (searchTerm:string) => {
    const filtered = planets
      .filter((planet) => planet.name.includes(searchTerm));

    setFilteredPlanets(filtered);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const planetsResponse = await fetchPlanets();
      setPlanets(planetsResponse);
    };
    fetchApi();
  }, []);

  const providerValues = {
    planets,
    handleFilterPlanet,
    filteredPlanets,
  };

  return (
    <PlanetsProvider value={ providerValues }>
      <FilterPlanets />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
