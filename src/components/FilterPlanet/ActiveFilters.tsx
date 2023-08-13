import { useCallback, useContext } from 'react';
import { RxTrash } from 'react-icons/rx';

import { PlanetsContext } from '../../context/PlanetsContext';
import { EraseFilterEvent } from '../../types';
import styles from './filterForm.module.css';

export default function ActiveFilters() {
  const {
    activeFilters, handleActiveFilters,
  } = useContext(PlanetsContext);

  const handleRemoveFilter = useCallback((event: EraseFilterEvent) => {
    const { id } = event.currentTarget;
    const filtersApplied = activeFilters.filter((filter) => filter.id !== id);
    handleActiveFilters(filtersApplied);
  }, [activeFilters, handleActiveFilters]);

  const handleRemoveAllFilters = useCallback((event: EraseFilterEvent) => {
    const { id } = event.currentTarget;
    if (id === 'remove_all_filters') {
      handleActiveFilters([]);
    }
  }, [handleActiveFilters]);

  return (
    <>
      <ul className={ styles.active_filters_container }>
        {activeFilters && activeFilters.map((filter) => (
          <li
            key={ filter.id }
            data-testid="filter"
            className={ styles.filter }
          >
            {`${filter.column} | ${filter.comparison} | ${filter.value}`}
            <button
              type="button"
              id={ filter.id }
              onClick={ handleRemoveFilter }
              className={ styles.clear_filter_button }
            >
              <RxTrash
                className={ styles.clear_filter_icon }
                size={ 20 }
              />
            </button>
          </li>
        ))}
      </ul>
      {
        activeFilters.length > 1 && (
          <button
            type="button"
            id="remove_all_filters"
            data-testid="button-remove-filters"
            onClick={ handleRemoveAllFilters }
            className={ styles.remove_clear_all_button }
          >
            Remover todos os filtros
          </button>
        )
      }
    </>
  );
}
