import ActiveFilters from './ActiveFilters';

import FilterByText from './FilterByText';
import styles from './filterForm.module.css';
import NumericFilter from './NumericFilter';

export default function FilterPlanet() {
  return (
    <form id="text-filter-form" className={ styles.form }>
      <FilterByText />
      <NumericFilter />
      <ActiveFilters />
    </form>
  );
}
