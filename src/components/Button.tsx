import { ReactNode } from 'react';

interface ButtonStatusProps {
  children: ReactNode;
  active: string;
  state: string;
  testId?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonStatus(props: ButtonStatusProps) {
  const {
    children,
    active,
    state,
    onClick,
  } = props;

  return (
    <button
      type="button"
      className={`text-xl mr-4 px-4 py-1 border-2 ${state === active ? 'border-black' : 'border-transparent'}  hover:border-black border-black`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface ButtonProps {
  children: ReactNode;
  dataId: string;
  className: string;
  testId: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: ButtonProps) {
  const {
    children,
    dataId,
    testId,
    className,
    onClick,
  } = props;

  return (
    <button type="button" data-testid={testId} data-id={dataId} className={className} onClick={onClick}>
      {children}
    </button>
  )
}