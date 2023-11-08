import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface CardGroupProps {
  children: ReactNode;
  cols?: number;
  className?: string;
}

const CardGroup = (props: CardGroupProps) => {
  let cols = 'grid-cols-1';

  switch (props.cols) {
    case 5:
      cols = 'grid-cols-5';
      break;
    case 4:
      cols = 'grid-cols-4';
      break;
    case 3:
      cols = 'grid-cols-3';
      break;
    case 2:
      cols = 'grid-cols-2';
      break;
  }

  return (
    <div className={cn('grid gap-x-4 [&>div]:my-2', cols, props.className)}>
      {props.children}
    </div>
  );
};

export { CardGroup };
export type { CardGroupProps };
