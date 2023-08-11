import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';


import App from '../App';
import { checkIfTableIsPresent } from './helpers/helperFunctions';
import { mockData } from './helpers/mockData';

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (mockData),
  });
  render(<App />);
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

  it('the user should be able to filter a planet using numeric filters', async () => {
    const columnSelect = screen.getByRole('combobox', { name: /column:/i })
    const comparisonSelect = screen.getByRole('combobox', { name: /comparison:/i })
    const valueInput = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByTestId('button-filter');

    expect(columnSelect).toHaveValue('population')
    expect(comparisonSelect).toHaveValue('maior que')
    expect(valueInput).toHaveValue('0')

    await userEvent.selectOptions(columnSelect, 'rotation_period')
    await userEvent.selectOptions(comparisonSelect, 'menor que')
    await userEvent.type(valueInput, '24')

    const filteredPlanets = [
      'Alderaan',
      'Yavin',
      'Coruscant'
    ]

    filteredPlanets.forEach(async (planet) => {
      const planetFiltered = await screen.findByRole('cell', { name: planet })
      expect(planetFiltered).toBeInTheDocument()
    })

  })


  it('the user should be able to apply multiple filters', async () => {
    const columnSelect = screen.getByRole('combobox', { name: /column:/i })
    const comparisonSelect = screen.getByRole('combobox', { name: /comparison:/i })
    const valueInput = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByTestId('button-filter');

    expect(columnSelect).toHaveValue('population')
    expect(comparisonSelect).toHaveValue('maior que')
    expect(valueInput).toHaveValue('0')

    await userEvent.selectOptions(columnSelect, 'rotation_period')
    await userEvent.selectOptions(comparisonSelect, 'menor que')
    await userEvent.type(valueInput, '24')
    await userEvent.click(buttonFilter);

    const firstFilterResult = [
      'Alderaan',
      'Yavin',
      'Coruscant'
    ]

    firstFilterResult.forEach(async (planet) => {
      const planetFiltered = await screen.findByRole('cell', { name: planet })
      expect(planetFiltered).toBeInTheDocument()
    })

    const secondFilterResult = [
      'Alderaan',
      'Coruscant'
    ]

    await userEvent.selectOptions(columnSelect, 'orbital_period')
    await userEvent.selectOptions(comparisonSelect, 'menor que')
    await userEvent.type(valueInput, '400')
    await userEvent.click(buttonFilter);
    secondFilterResult.forEach(async (planet) => {
      const planetFiltered = await screen.findByRole('cell', { name: planet })
      expect(planetFiltered).toBeInTheDocument()
    })

    await userEvent.selectOptions(columnSelect, 'diameter')
    await userEvent.selectOptions(comparisonSelect, 'igual a')
    await userEvent.type(valueInput, '12500')
    await userEvent.click(buttonFilter);
    
    const thirdFilterResult = await screen.findByRole('cell', { name: 'Alderaan' })
    expect(thirdFilterResult).toBeInTheDocument()
  })


});
