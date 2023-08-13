import { createContext } from 'react';
import { Planet } from '../types';

export type PlanetsContextType = {
  planets: Planet[],
};

export const PlanetsContext = createContext({} as PlanetsContextType);
