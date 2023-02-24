import { FormEvent, MouseEvent } from 'react';

import Icon from '@mdi/react';
import { mdiDeleteEmpty, mdiPen } from '@mdi/js';

import { Todo } from '../models/todo';
import { Button } from '../components';

interface TodoItemProps {
  data: Todo[];
  cache: Todo;
  setCache: (cache: Todo) => void;
  updateTodo: (event: FormEvent) => void;
  toggleTodo: (event: MouseEvent<HTMLInputElement>) => void;
  deleteTodo: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function TodoItem(props: TodoItemProps) {
  const {
    data,
    cache,
    setCache,
    updateTodo,
    toggleTodo,
    deleteTodo
  } = props;

  return (
    <ul>
      {
        data.map((item: Todo) => (
          <li className=" mb-3 pb-4" key={item.id}>
            <div className="flex items-center justify-between">
              {
                cache.id === item.id ? (
                  <form onSubmit={updateTodo}>
                    <label>
                      <input id={item.id} type="text" className="w-full" data-testid="update" data-id={item.id} defaultValue={item.text} />
                    </label>
                  </form>
                ) : (
                  <label>
                    <input type="checkbox" className="rounded-full w-[20px] h-[20px] mr-4" data-id={item.id} defaultChecked={item.isCompleted} onClick={toggleTodo} />
                    <span className={`text-xl ${item.isCompleted ? 'line-through' : ''}`}>{item.text}</span>
                  </label>
                )
              }
              <div>
                <Button
                  testId="edit"
                  dataId={item.id}
                  className="text-xl mr-2"
                  onClick={() => {
                    setCache(item)
                  }}
                >
                  <Icon path={mdiPen} size={1} />
                </Button>
                <Button
                  testId="delete"
                  dataId={item.id}
                  className="text-xl mr-2"
                  onClick={deleteTodo}
                >
                  <Icon path={mdiDeleteEmpty} size={1} />
                </Button>
              </div>
            </div>
            <p className="text-xs text-right border-b-2 border-gray-400">{item.createdAt}</p>
          </li>
        ))
      }
    </ul>
  )
}
