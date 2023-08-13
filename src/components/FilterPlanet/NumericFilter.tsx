import { useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PlanetsContext } from '../../context/PlanetsContext';

import { columnFilterOptions, filtersInitalValues, sortinitalValue } from './filtersData';

import { Filter, NumericFilterEvent, Planet, SortType } from '../../types';

import styles from './filterForm.module.css';
import { moveUnknownToEnd } from './helpers/moveUnknowToEnd';

export default function NumericFilter() {
  const {
    planets,
    activeFilters,
    handleActiveFilters,
    handleFilterPlanets,
  } = useContext(PlanetsContext);
  const [filterValues, setFilterValues] = useState<Filter>(filtersInitalValues);
  const [sortValue, setSortValue] = useState<SortType>(sortinitalValue);

  const avalableFilters = activeFilters
    .map((filterName) => filterName.column);

  const columnOptions = columnFilterOptions
    .filter((columnOption) => !avalableFilters.includes(columnOption as keyof Planet));

  const handleFilterValues = useCallback((event: NumericFilterEvent) => {
    const { id, value } = event.target;
    setFilterValues((prevData) => ({ ...prevData, [id]: value }));
  }, []);

  const handleSortValues = useCallback((event: NumericFilterEvent) => {
    const { name, value } = event.target;
    setSortValue({ ...sortValue, [name]: value });
  }, [sortValue]);

  const handleSort = useCallback((sort:SortType) => {
    let sortedPlanets = planets;
    if (sort.order === 'ASC') {
      sortedPlanets = sortedPlanets
        .sort((planetA, planetB) => Number(planetA[sort.column_sort as keyof Planet])
      - Number(planetB[sort.column_sort as keyof Planet]));
    }

    if (sort.order === 'DESC') {
      sortedPlanets
        .sort((planetA, planetB) => Number(planetB[sort.column_sort as keyof Planet])
    - Number(planetA[sort.column_sort as keyof Planet]));
    }
    sortedPlanets = moveUnknownToEnd(sortedPlanets, sort);
    handleFilterPlanets(sortedPlanets);
  }, [planets, handleFilterPlanets]);

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
    <fieldset className={ styles.main_filter_container }>
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
      <fieldset className={ styles.numeric_filter_container }>
        <label htmlFor="column_sort" className={ styles.options_container }>
          Ordenar
          <select
            name="column_sort"
            data-testid="column-sort"
            className={ styles.selects }
            value={ sortValue.column_sort }
            onChange={ handleSortValues }
          >
            {columnFilterOptions.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
        </label>
        <fieldset className={ styles.sort_values }>
          <label htmlFor="ASC">
            <input
              type="radio"
              id="ASC"
              name="order"
              data-testid="column-sort-input-asc"
              checked={ sortValue.order === 'ASC' }
              value="ASC"
              onChange={ handleSortValues }
            />
            ASC
          </label>
          <label htmlFor="DESC">

            <input
              type="radio"
              id="DESC"
              name="order"
              data-testid="column-sort-input-desc"
              checked={ sortValue.order === 'DESC' }
              value="DESC"
              onChange={ handleSortValues }
            />
            DESC
          </label>
        </fieldset>
        <button
          type="button"
          data-testid="column-sort-button"
          className={ styles.filter_button }
          onClick={ () => handleSort(sortValue) }
        >
          Ordenar
        </button>
      </fieldset>
    </fieldset>
  );
}
