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

});
