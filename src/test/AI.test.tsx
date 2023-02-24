import React from 'react';
import { screen, render, fireEvent, act } from '@testing-library/react';
import App from '../App';

import { Crypto } from "@peculiar/webcrypto"

global.crypto = new Crypto();

beforeEach(() => {
  localStorage.clear();
});

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/TodoList/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders input field', () => {
  render(<App />);
  const inputElement = screen.getByTestId('text');
  expect(inputElement).toBeInTheDocument();
});

test('create todo', () => {
  render(<App />);
  const inputElement = screen.getByTestId('text');
  fireEvent.change(inputElement, { target: { value: 'test todo' } });
  fireEvent.submit(inputElement);
  const todoElement = screen.getByText('test todo');
  expect(todoElement).toBeInTheDocument();
});

test('update todo', async () => {
  render(<App />);
  const inputElement = screen.getByTestId('text');
  fireEvent.change(inputElement, { target: { value: 'test todo' } });
  fireEvent.submit(inputElement);
  await screen.findByTestId('edit');
  const editElement = screen.getByTestId('edit');
  await act(async () => {
    editElement.click();
  });
  await screen.findByTestId('update'); // 等待更新完成
  const updateElement = screen.getByTestId('update');
  expect(updateElement).toBeInTheDocument();
  fireEvent.change(updateElement, { target: { value: 'updated todo' } });
  fireEvent.submit(updateElement);
  await screen.findByText('updated todo');
  const updatedTodoElement = screen.getByText('updated todo');
  expect(updatedTodoElement).toBeInTheDocument();
});

test('toggle todo', async () => {
  render(<App />);
  const inputElement = screen.getByTestId('text');
  fireEvent.change(inputElement, { target: { value: 'test todo' } });
  fireEvent.submit(inputElement);
  await screen.findByText('test todo');
  const checkboxElement = screen.getByRole('checkbox', { name: 'test todo' });
  fireEvent.click(checkboxElement);
  expect(checkboxElement).toBeChecked();
});

test('delete todo', async() => {
  render(<App />);
  const inputElement = screen.getByTestId('text');
  fireEvent.change(inputElement, { target: { value: 'test todo' } });
  fireEvent.submit(inputElement);
  await screen.findByTestId('delete');
  const deleteButton = screen.getByTestId('delete');
  fireEvent.click(deleteButton);
  
  const deletedTodoElement = screen.queryByText('test todo');
  expect(deletedTodoElement).toBeNull();
});
