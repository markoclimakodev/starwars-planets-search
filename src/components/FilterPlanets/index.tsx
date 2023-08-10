import { useCallback, useContext } from 'react';
import { PlanetContext } from '../../context/planetsContext';

export default function FilterPlanets() {
  const { handleFilterPlanet } = useContext(PlanetContext);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    handleFilterPlanet(searchTerm);
  }, [handleFilterPlanet]);

  return (
    <form>
      <label htmlFor="filterPlanet">
        <input
          type="text"
          id="filterPlanet"
          data-testid="name-filter"
          onChange={ handleSearchChange }
        />
      </label>
    </form>
  );
}
