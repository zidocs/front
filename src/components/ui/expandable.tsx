'use client';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type ExpandableProps = {
  title: string;
  children: React.ReactNode;
};

const Expandable = (props: ExpandableProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="mb-2 mt-2 flex w-full items-center gap-1 text-start hover:text-black hover:dark:text-white"
      >
        {open ? (
          <>
            <ChevronUp size={16} />
            Hide
          </>
        ) : (
          <>
            <ChevronRight size={16} />
            Show
          </>
        )}{' '}
        {props.title}
      </button>
      {open && (
        <div className="my-0 ml-2 border-l border-zinc-300 pl-4 dark:border-zinc-900 [&>:first-child]:!pt-4 [&>:last-child]:!mb-6">
          {props.children}
        </div>
      )}
    </div>
  );
};

export { Expandable };
export type { ExpandableProps };
