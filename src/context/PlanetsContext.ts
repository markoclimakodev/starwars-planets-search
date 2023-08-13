import { createContext } from 'react';
import { Filter, Planet } from '../types';

export type PlanetContextType = {
  planets: Planet[],
  filteredPlanets: Planet[],
  activeFilters: Filter[],
  handleFilterPlanets: (planets:Planet[]) => void
  handleActiveFilters: (filters:Filter[]) => void
};

export const PlanetsContext = createContext({} as PlanetContextType);
