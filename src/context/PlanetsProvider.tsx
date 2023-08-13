import { useCallback, useEffect, useState } from 'react';
import { fetchPlanets } from '../api/api';
import { Filter, Planet } from '../types';
import { PlanetsContext } from './PlanetsContext';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

export function PlanetsProvider({ children }:PlanetsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const fetchApi = useCallback(async () => {
    const planetsResponse = await fetchPlanets();
    setPlanets(planetsResponse);
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const handleFilterPlanets = useCallback((planet:Planet[]) => {
    setFilteredPlanets(planet);
  }, []);

  const handleActiveFilters = useCallback(
    (filters:Filter[]) => {
      setActiveFilters(filters);

      let planetsToFilter = planets;

      filters.forEach((filter) => {
        planetsToFilter = planetsToFilter.filter((planet) => {
          const columnValue = Number(planet[filter.column as keyof Planet]);
          const comparisonValue = Number(filter.value);
          const comparisons = {
            'maior que': () => columnValue > comparisonValue,
            'menor que': () => columnValue < comparisonValue,
            'igual a': () => columnValue === comparisonValue,
          };
          const comparisonResult = comparisons[filter.comparison];
          return comparisonResult ? comparisonResult() : planet;
        });
      });
      setActiveFilters(filters);
      handleFilterPlanets(planetsToFilter);
    },
    [planets, handleFilterPlanets],
  );

  const providerValues = {
    planets,
    filteredPlanets,
    activeFilters,
    handleFilterPlanets,
    handleActiveFilters,
  };

  return (
    <PlanetsContext.Provider value={ providerValues }>
      {children}
    </PlanetsContext.Provider>
  );
}
