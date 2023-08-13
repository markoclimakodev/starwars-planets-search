import { useCallback, useEffect, useState } from 'react';
import { PlanetsContext } from './PlanetsContext';
import { fetchPlanets } from '../api/api';
import { Planet } from '../types';

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
    <PlanetsContext.Provider value={ providerValues }>
      {children}
    </PlanetsContext.Provider>
  );
}
