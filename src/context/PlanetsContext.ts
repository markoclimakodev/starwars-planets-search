import { createContext } from 'react';
import { Planet } from '../types';

export type PlanetContextType = {
  planets: Planet[],
};

export const PlanetContext = createContext({} as PlanetContextType);
