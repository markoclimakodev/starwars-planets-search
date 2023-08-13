import { useCallback, useEffect, useState } from 'react';
import { fetchPlanets } from '../api/api';
import { Planet } from '../types';
import { PlanetContext } from './PlanetsContext';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

export function PlanetsProvider({ children }:PlanetsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);

  const fetchApi = useCallback(async () => {
    const planetsResponse = await fetchPlanets();
    setPlanets(planetsResponse);
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const providerValues = {
    planets,

  };

  return (
    <PlanetContext.Provider value={ providerValues }>
      {children}
    </PlanetContext.Provider>
  );
}
