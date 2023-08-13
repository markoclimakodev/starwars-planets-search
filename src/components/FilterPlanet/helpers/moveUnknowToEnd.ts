import { Planet, SortType } from '../../../types';

export const moveUnknownToEnd = (planets:Planet[], sort:SortType):Planet[] => {
  const knownValues:Planet[] = planets
    .filter((planet:Planet) => planet[sort.column_sort] !== 'unknown');
  const unknownValues:Planet[] = planets
    .filter((planet:Planet) => planet[sort.column_sort] === 'unknown');

  return knownValues.concat(unknownValues);
};
