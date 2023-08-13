import { useContext } from 'react';

import { Planet } from '../../types';
import { TableRow } from './TableRow';
import { headerData } from './tableHeadData';

import { PlanetsContext } from '../../context/PlanetsContext';
import styles from './planet_table.module.css';

export default function PlanetTable() {
  const { planets } = useContext(PlanetsContext);

  return (
    <table className={ styles.table }>
      <thead className={ styles.thead }>
        <TableRow data={ headerData } rowType="th" />
      </thead>
      <tbody className={ styles.tbody }>
        { planets && planets.map((planet:Planet) => (
          <TableRow data={ planet } rowType="td" key={ planet.name } />
        ))}
      </tbody>
    </table>
  );
}
