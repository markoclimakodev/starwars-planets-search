import { Planet } from '../types';

const API_URL = 'https://swapi.dev/api/planets';

export async function fetchPlanets(): Promise<Planet[]> {
  const request = await fetch(API_URL);
  const response = await request.json();
  const filterResponse = response.results.map((obj:Planet) => {
    const { residents, ...planet } = obj;
    return planet;
  });
  const data:Planet[] = filterResponse;
  return data;
}
