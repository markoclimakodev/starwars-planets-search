import { PlanetContext, PlanetContextType } from './planetsContext';

type PlanetsProviderProps = {
  children: React.ReactNode,
  value: PlanetContextType
};

export function PlanetsProvider({ children, value }:PlanetsProviderProps) {
  return (
    <PlanetContext.Provider value={ value }>
      {children}
    </PlanetContext.Provider>
  );
}
