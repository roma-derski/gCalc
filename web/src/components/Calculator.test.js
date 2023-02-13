import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator test operators', () => {
  it('performs addition correctly', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.click(getByTestId('1'));
    fireEvent.click(getByTestId('+'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('='));

    const result = getByTestId('result');

    expect(result.value).toBe('3');
  });

  it('performs subtraction correctly', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.click(getByTestId('5'));
    fireEvent.click(getByTestId('-'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('='));

    const result = getByTestId('result');

    expect(result.value).toBe('3');
  });

  it('performs multiplication correctly', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.click(getByTestId('1'));
    fireEvent.click(getByTestId('0'));
    fireEvent.click(getByTestId('*'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('='));

    const result = getByTestId('result');

    expect(result.value).toBe('20');
  });

  it('performs multiplication division', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('0'));
    fireEvent.click(getByTestId('/'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('='));

    const result = getByTestId('result');

    expect(result.value).toBe('10');
  });

});


describe('Calculator clear', () => {
    it('clears the result when the clear button is clicked', () => {
        //for you to write
    });
})