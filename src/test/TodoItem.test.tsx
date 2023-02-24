import { render, screen } from '@testing-library/react';
import { TodoItem } from '../components';

import { Crypto } from "@peculiar/webcrypto"

global.crypto = new Crypto();

describe('TodoList 測試', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  test('畫面上有一個 TodoList', () => {
    const data = [{
      id: '1',
      text: 'Hello World',
      isCompleted: false,
      createdAt: '2023-02-08 00:00:00'
    }];
    // mock function
    const setCache= jest.fn();
    const updateTodo = jest.fn();
    const toggleTodo = jest.fn();
    const deleteTodo = jest.fn();
    render(<TodoItem
      data={data}
      cache={{id: '', text: '', isCompleted: false, createdAt: ''}}
      setCache={setCache}
      updateTodo={updateTodo}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
    />);

    const linkElement = screen.getByText(/Hello World/i);
    expect(linkElement).toBeInTheDocument();
  });
})