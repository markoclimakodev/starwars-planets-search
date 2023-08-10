import { Planet } from '../types';

export async function fetchPlanets(): Promise<Planet[]> {
  const request = await fetch('https://swapi.dev/api/planets');
  const response = await request.json();
  const filterResponse = response.results.map((obj:Planet) => {
    const { residents, ...planet } = obj;
    return planet;
  });
  const data:Planet[] = filterResponse;
  return data;
}
