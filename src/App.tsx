import { useEffect, useState, useMemo, MouseEvent, FormEvent } from 'react';

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import { Todo } from './models/todo';

import { TodoItem, ButtonStatus } from './components';

function App() {
  const [data, setData] = useState<Todo[]>(() => JSON.parse(localStorage.getItem('todo') || '[]'));
  const [cache, setCache] = useState<Todo>({
    id: '',
    text: '',
    isCompleted: false,
    createdAt: ''
  });
  const [state, setState] = useState<'all' | 'active' | 'completed'>('all');

  const filterData = useMemo(() => {
    if (state === 'active') {
      return data.filter((item) => !item.isCompleted);
    }
    if (state === 'completed') {
      return data.filter((item) => item.isCompleted);
    }

    return data;
  }, [data, state]);

  const createTodo = (event: FormEvent) => {
    event.preventDefault();
    const textId = document.querySelector('#text') as HTMLInputElement;
    setData([
      ...data,
      {
        id: crypto.randomUUID(),
        text: textId.value,
        isCompleted: false,
        createdAt: new Date().toLocaleString(),
      }
    ]);

    textId.value = '';
  }

  const updateTodo = (event: FormEvent) => {
    event.preventDefault();
    const textId = document.getElementById(cache.id) as HTMLInputElement;
    const newData = data.map((item) => {
      if (item.id === cache.id) {
        return {
          ...item,
          text: textId.value,
        }
      }
      return item;
    })

    setData(newData);
    setCache({
      id: '',
      text: '',
      isCompleted: false,
      createdAt: '',
    });
  };


  const toggleTodo = (event: MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { id } = target.dataset;
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        }
      }
      return item;
    })

    setData(newData);
  }

  const deleteTodo = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    const { id } = target.dataset;
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(data));
  }, [data])

  const style = {
    backgroundImage: "url('/images/glenn-carstens-peters-RLw-UC03Gwc-unsplash.jpg')"
  };

  return (
    <div className="h-screen w-100 bg-cover flex justify-center items-center" style={style}>
      <div className="h-[550px] backdrop-blur-md p-5 w-[800px] rounded-md border-2 border-white bg-opacity-80 shadow-xl">
        <header className="text-4xl text-[#474747] font-bold text-center mb-5">
          TodoList
        </header>
        <div>
          <form onSubmit={createTodo}>
            <label className="w-full flex items-center relative">
              <Icon path={mdiPlus} size={1.3} color="#00251A" className="m-3 absolute z-10" />
              <input data-testid="text" id="text" className="pl-[50px] w-full opacity-90 text-xl h-[60px] border-0 rounded-md focus:ring-0" type="text" placeholder="TodoList..."/>
            </label>
          </form>
        </div>

        <main className="bg-white bg-opacity-80 mt-4 overflow-y-auto h-[300px] rounded-md p-3">
          <TodoItem
            data={filterData}
            cache={cache}
            setCache={setCache}
            updateTodo={updateTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </main>

        <footer className="bg-white bg-opacity-80 p-3 mt-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-xl">{filterData.length} items left</span>
            <div className="flex">
              <ButtonStatus
                active={'all'}
                state={state}
                onClick={() => {
                  setState('all');
                }}
              >
                All
              </ButtonStatus>
              <ButtonStatus
                active={'active'}
                state={state}
                onClick={() => {
                  setState('active');
                }}
              >
                Active
              </ButtonStatus>
              <ButtonStatus
                active={'completed'}
                state={state}
                onClick={() => {
                  setState('completed');
                }}
              >
                Completed
              </ButtonStatus>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
