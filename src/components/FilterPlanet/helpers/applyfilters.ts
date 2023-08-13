import { Filter, Planet } from '../../../types';

export function applyFilters(planets: Planet[], filters: Filter[]): Planet[] {
  return filters.reduce((filteredPlanets, filter) => {
    return filteredPlanets.filter((planet) => {
      const columnValue = Number(planet[filter.column]);
      const comparisonValue = Number(filter.value);
      const comparisons = {
        'maior que': () => columnValue > comparisonValue,
        'menor que': () => columnValue < comparisonValue,
        'igual a': () => columnValue === comparisonValue,
      };
      const comparisonResult = comparisons[filter.comparison];
      return comparisonResult ? comparisonResult() : true;
    });
  }, planets);
}
