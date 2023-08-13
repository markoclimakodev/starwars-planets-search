import { useCallback } from 'react';

import { Planet, TableHeaders } from '../../types';
import styles from './planet_table.module.css';

type PlanetRowProps = {
  data: Planet | TableHeaders;
  rowType: 'th' | 'td'
};

export function TableRow({ data, rowType }: PlanetRowProps) {
  const Cell = rowType === 'th' ? 'th' : 'td';

  const renderUrls = useCallback((urls: string[]) => {
    return urls.map((url) => (
      <span key={ url } className={ styles.links }>
        {url}
      </span>
    ));
  }, []);

  return (
    <tr className={ styles.tr }>
      <Cell>{data.name}</Cell>
      <Cell>{data.rotation_period}</Cell>
      <Cell>{data.orbital_period}</Cell>
      <Cell>{data.diameter}</Cell>
      <Cell>{data.climate}</Cell>
      <Cell>{data.gravity}</Cell>
      <Cell>{data.terrain}</Cell>
      <Cell>{data.surface_water}</Cell>
      <Cell>{data.population}</Cell>
      <Cell className={ `${styles.arrayCell} ${styles.th} ${styles.td}` }>

        { Array.isArray(data.films) && renderUrls(data.films) }
        { !Array.isArray(data.films) && data.films}

      </Cell>
      <Cell className={ styles.break_cell }>{data.created}</Cell>
      <Cell className={ styles.break_cell }>{data.edited}</Cell>
      <Cell className={ `${styles.arrayCell} ${styles.th} ${styles.td}` }>
        { Array.isArray(data.url) && renderUrls(data.url) }
        { !Array.isArray(data.url) && data.url}
      </Cell>
    </tr>
  );
}
