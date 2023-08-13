import { useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Filter, NumericFilterEvent, Planet } from '../../types';
import { columnFilterOptions } from './filtersData';

import { PlanetsContext } from '../../context/PlanetsContext';
import styles from './filterForm.module.css';

const filtersInitalValues:Filter = {
  column: 'population',
  comparison: 'maior que',
  value: '0',
  id: '',
};

export default function NumericFilter() {
  const {
    activeFilters,
    handleActiveFilters,
  } = useContext(PlanetsContext);
  const [filterValues, setFilterValues] = useState<Filter>(filtersInitalValues);

  const avalableFilters = activeFilters
    .map((filterName) => filterName.column);

  const columnOptions = columnFilterOptions
    .filter((columnOption) => !avalableFilters.includes(columnOption as keyof Planet));

  const handleFilterValues = useCallback((event: NumericFilterEvent) => {
    const { id, value } = event.target;
    setFilterValues((prevData) => ({ ...prevData, [id]: value }));
  }, []);

  const applyFilters = useCallback((filters:Filter[]) => {
    handleActiveFilters(filters);
  }, [handleActiveFilters]);

  const handleApplyFilter = useCallback(() => {
    const newFilter = {
      ...filterValues, id: uuidv4(),
    };

    applyFilters([...activeFilters, newFilter]);
    setFilterValues(filtersInitalValues);
  }, [filterValues, activeFilters, applyFilters]);

  return (
    <fieldset className={ styles.numeric_filter_container }>
      <label htmlFor="column-filter" className={ styles.options_container }>
        Column:
        <select
          id="column"
          data-testid="column-filter"
          className={ styles.selects }
          value={ filterValues.column }
          onChange={ handleFilterValues }
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>

      </label>
      <label htmlFor="comparison-filter" className={ styles.options_container }>
        Comparison:
        <select
          id="comparison"
          data-testid="comparison-filter"
          className={ styles.selects }
          value={ filterValues.comparison }
          onChange={ handleFilterValues }

        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          id="value"
          className={ styles.filter_value }
          data-testid="value-filter"
          type="text"
          value={ filterValues.value }
          onChange={ handleFilterValues }

        />
      </label>
      <button
        type="button"
        id="button-filter"
        className={ styles.filter_button }
        data-testid="button-filter"
        onClick={ handleApplyFilter }
      >
        FILTRAR
      </button>
    </fieldset>
  );
}
