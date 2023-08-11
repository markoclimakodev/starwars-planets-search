import { useCallback, useContext, useState } from 'react';
import { PlanetContext } from '../../context/planetsContext';
import { Planet } from '../../types';

type Comparison = 'maior que' | 'menor que' | 'igual a';

type Filter = {
  column: keyof Planet;
  comparison: Comparison
  value: string;
};

export default function FilterPlanets() {
  const {
    handleFilterPlanet,
    planets,
    handleFilteredPlanetNumeric,
  } = useContext(PlanetContext);

  const [column, setColumn] = useState<keyof Planet>('population');
  const [comparison, setComparison] = useState<Comparison>('maior que');
  const [value, setValue] = useState('0');
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    handleFilterPlanet(searchTerm);
  }, [handleFilterPlanet]);

  const applyFilters = useCallback((newFilters:Filter[]) => {
    setAppliedFilters(newFilters);

    let filteredPlanets = planets;
    newFilters.forEach((filter) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        const planetValue = Number(planet[filter.column as keyof Planet]);
        const inputValue = Number(filter.value);

        switch (filter.comparison) {
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
    });
    handleFilteredPlanetNumeric(filteredPlanets);
  }, [handleFilteredPlanetNumeric, planets]);

  const handleFilters = useCallback(() => {
    const newFilter:Filter = {
      column,
      comparison,
      value,
    };

    applyFilters([...appliedFilters, newFilter]);
  }, [column, comparison, value, appliedFilters, applyFilters]);

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
          onChange={ (event) => setColumn(event.target.value as keyof Planet) }
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
          onChange={ (event) => setComparison(event.target.value as Comparison) }
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
        onClick={ handleFilters }
      >
        FILTRAR

      </button>
    </form>
  );
}
