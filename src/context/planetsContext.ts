import { createContext } from 'react';
import { Planet } from '../types';

export type PlanetContextType = {
  planets: Planet[],
  filteredPlanets: Planet[],
  handleFilterPlanet: (search:string) => void
};

export const PlanetContext = createContext({} as PlanetContextType);
