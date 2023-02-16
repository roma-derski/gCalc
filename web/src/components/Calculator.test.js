import { render, fireEvent } from '@testing-library/react';
import Calculator from "./Calculator";

describe('Calculator clear', () => {
  it('clears the result when the clear button is clicked', () => {
    const { getByTestId } = render(<Calculator />);
    
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('0'));
    fireEvent.click(getByTestId("Clear"));

    const result = getByTestId('result');

    expect(result.value).toBe("");
  });
});
