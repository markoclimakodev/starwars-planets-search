import { RxMagnifyingGlass } from 'react-icons/rx';

import { useCallback, useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';
import { InputChangeEvent } from '../../types';
import styles from './filterForm.module.css';

export default function FilterByText() {
  const { handleFilterPlanets, planets } = useContext(PlanetsContext);

  const handleFilterPlanetByName = useCallback((event:InputChangeEvent) => {
    const serachValue = event.target.value;
    const filtered = planets
      .filter((planet) => planet.name.toUpperCase().includes(serachValue.toUpperCase()));
    handleFilterPlanets(filtered);
  }, [handleFilterPlanets, planets]);

  return (
    <label htmlFor="filter-input" className={ styles.filter_by_name_container }>
      <input
        type="text"
        id="filter-input"
        data-testid="name-filter"
        name="filter-input"
        aria-label="Campo de filtro de texto"
        className={ styles.filter_by_name }
        onChange={ handleFilterPlanetByName }
      />
      <RxMagnifyingGlass
        size={ 32 }
        color="#f2f6f7"
        className={ styles.searchIcon }
      />
    </label>
  );
}
