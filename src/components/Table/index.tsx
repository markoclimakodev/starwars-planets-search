import { useContext } from 'react';
import { PlanetContext } from '../../context/planetsContext';
import { Planet } from '../../types';

export default function Table() {
  const { planets, filteredPlanets } = useContext(PlanetContext);
  const tableHeaders = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];
  const planetsToDisplay = filteredPlanets.length > 0 ? filteredPlanets : planets;

  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((tableHeadName) => (
            <th key={ tableHeadName }>
              {tableHeadName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planetsToDisplay && planetsToDisplay.map((planet:Planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
