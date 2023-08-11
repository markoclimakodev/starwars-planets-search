import { useCallback, useContext, useState } from 'react';
import { PlanetContext } from '../../context/planetsContext';
import { Planet } from '../../types';

export default function FilterPlanets() {
  const {
    handleFilterPlanet,
    planets,
    handleFilteredPlanetNumeric,
  } = useContext(PlanetContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    handleFilterPlanet(searchTerm);
  }, [handleFilterPlanet]);

  const handleFilter = useCallback(() => {
    const filteredPlanets = planets.filter((planet) => {
      const planetValue = Number(planet[column as keyof Planet]);
      const inputValue = Number(value);

      switch (comparison) {
        case 'maior que':
          return planetValue > inputValue;
        case 'menor que':
          return planetValue < inputValue;
        case 'igual a':
          return planetValue === inputValue;
        default:
          return false;
      }
    });

    handleFilteredPlanetNumeric(filteredPlanets);
  }, [column, comparison, value, handleFilteredPlanetNumeric, planets]);
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
      <label htmlFor="column-filter">
        Column:
        <select
          id="column-filter"
          value={ column }
          data-testid="column-filter"
          onChange={ (event) => setColumn(event.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Comparison:
        <select
          id="comparison-filter"
          value={ comparison }
          data-testid="comparison-filter"
          onChange={ (event) => setComparison(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          id="value-filter"
          value={ value }
          data-testid="value-filter"
          onChange={ (event) => setValue(event.target.value) }
          type="text"
        />
      </label>

      <button
        type="button"
        id="button-filter"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        FILTRAR

      </button>
    </form>
  );
}
