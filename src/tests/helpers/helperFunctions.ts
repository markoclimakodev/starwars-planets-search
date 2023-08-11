import { screen } from '@testing-library/dom';

export const checkIfTableIsPresent = () => {
  const table = screen.getByRole('table');
  const nameColumn = screen.getByRole('columnheader', {
    name: /name/i
  });
  const rotationColumn = screen.getByRole('columnheader', { name: /rotation period/i })
  const orbitalColumn = screen.getByRole('columnheader', { name: /orbital period/i })
  const diameterColumn = screen.getByRole('columnheader', { name: /diameter/i });
  const climateColumn = screen.getByRole('columnheader', { name: /climate/i });
  const gravityColumn = screen.getByRole('columnheader', { name: /gravity/i });
  const terrainColumn = screen.getByRole('columnheader', { name: /terrain/i });
  const surfaceWaterColumn = screen.getByRole('columnheader', { name: /surface water/i });
  const populationColumn = screen.getByRole('columnheader', { name: /population/i });
  const filmsColumn = screen.getByRole('columnheader', { name: /films/i });
  const createdColumn = screen.getByRole('columnheader', { name: /created/i });
  const editedColumn = screen.getByRole('columnheader', { name: /edited/i });
  const urlColumn = screen.getByRole('columnheader', { name: /url/i });

  const planetTableElements = [
    table,
    nameColumn,
    rotationColumn,
    orbitalColumn,
    diameterColumn,
    climateColumn,
    gravityColumn,
    terrainColumn,
    surfaceWaterColumn,
    populationColumn,
    filmsColumn,
    createdColumn,
    editedColumn,
    urlColumn
  ];

  planetTableElements
    .forEach((tableElement) => expect(tableElement).toBeInTheDocument());
};