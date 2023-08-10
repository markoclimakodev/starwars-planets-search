import { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../../context/planetsContext';

export default function FilterPlanets() {
  const { handleFilterPlanet } = useContext(PlanetContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleFilterPlanet(search);
  }, [search, handleFilterPlanet]);

  return (
    <form>
      <label htmlFor="filterPlanet">
        <input
          type="text"
          id="filterPlanet"
          data-testid="name-filter"
          onChange={ (event) => setSearch(event.target.value) }
        />
      </label>
    </form>
  );
}
