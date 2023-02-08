import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

import { Crypto } from "@peculiar/webcrypto"

global.crypto = new Crypto();

describe('TodoList 測試', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  test('畫面上有一個 TodoList', () => {
    render(<App />);
    const linkElement = screen.getByText(/TodoList/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('針對 input 寫入文字', () => {
    render(<App />);
    const input = screen.getByTestId('text') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    const text = 'Hello World';
    input.value = text;
    expect(input.value).toBe(text);

    // Enter 送出
    fireEvent.submit(input);
    expect(input.value).toBe('');
  })

  test('新增一筆 Todo 之後下方列表可見', () => {
    render(<App />);
    const input = screen.getByTestId('text') as HTMLInputElement;
    const text = 'Hello World';
    input.value = text;
    fireEvent.submit(input);

    const todoItem = screen.getByText(text);
    expect(todoItem).toBeInTheDocument();
  })
})