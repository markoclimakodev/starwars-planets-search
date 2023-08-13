import { useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';

import { TableRow } from './TableRow';
import { headerData } from './tableHeadData';

import { Planet } from '../../types';

import styles from './planet_table.module.css';

export default function PlanetTable() {
  const { planets, filteredPlanets } = useContext(PlanetsContext);

  const planetsToDisplay = filteredPlanets.length > 0 ? filteredPlanets : planets;
  return (
    <table className={ styles.table }>
      <thead className={ styles.thead }>
        <TableRow data={ headerData } rowType="th" />
      </thead>
      <tbody className={ styles.tbody }>
        { planetsToDisplay && planetsToDisplay.map((planet:Planet) => (
          <TableRow
            data={ planet }
            rowType="td"
            key={ planet.name }
          />
        ))}
      </tbody>
    </table>
  );
}
