import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';


import App from '../App';
import { checkIfTableIsPresent } from './helpers/helperFunctions';
import { mockData } from './helpers/mockData';
import { ascPopulationSort } from './helpers/sortData';

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (mockData),
  });
  render(<App />);
  expect(global.fetch).toBeCalledTimes(1);

});

describe('Test for Table component', () => {
  it('should have a table', () => {
    checkIfTableIsPresent()
  })

  it('the user should be able to filter a planet by term', async () => {
    const inputSearch = screen.getByTestId('name-filter')

    await userEvent.type(inputSearch, 'Tatooine')

    const tatooine = await screen.findByRole('cell', { name: /tatooine/i })

    expect(tatooine).toBeInTheDocument()
  })
  it('the user should be able to filter a planet by term', async () => {
    const sortColumns = screen.getByTestId('column-sort')
    const ascSort = screen.getByTestId('column-sort-input-asc')
    const descSort = screen.getByTestId('column-sort-input-desc')
    const sortButton = screen.getByTestId('column-sort-button')

 
    expect(sortColumns).toBeInTheDocument()
    expect(ascSort).toBeInTheDocument()
    expect(descSort).toBeInTheDocument()

    const sortOrder = {
      column: 'population',
      order: 'ASC'
    }

    await userEvent.selectOptions(sortColumns, sortOrder.column)
    await userEvent.click(ascSort)
    await userEvent.click(sortButton)

    ascPopulationSort.forEach(async (planetName,index) => {
      const planet = await screen.findByRole('cell', { name: planetName })
      expect(planet).toBeInTheDocument()
      const getAllPlanets = screen.getAllByTestId('planet-name')
      expect(planet).toEqual(getAllPlanets[index])
    })

  })

});
