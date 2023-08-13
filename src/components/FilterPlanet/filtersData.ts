import { Filter } from '../../types';

export const columnFilterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const filtersInitalValues:Filter = {
  column: 'population',
  comparison: 'maior que',
  value: '0',
  id: '',
};
