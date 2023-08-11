export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  residents?: string[]
  created: string;
  edited: string;
  url: string;
};

export type PlanetResponse = {
  count: number;
  next: string ;
  previous: string;
  results: Planet[];
};

export type Comparison = 'maior que' | 'menor que' | 'igual a';

export type Filter = {
  column: keyof Planet;
  comparison: Comparison
  value: string;
};
