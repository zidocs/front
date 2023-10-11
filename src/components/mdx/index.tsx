import React from 'react';
import { Typography } from './typography';
import { cn, slugify } from '@/lib/utils';
import { CopyButton } from '../ui/copy-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = (props.children as string).split(' ').join('-').toLowerCase();
    return (
      <Typography
        className="-mt-24 pt-24 tracking-wide"
        id={slugify(id)}
        variant="h1"
        tag="h1"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = (props.children as string).split(' ').join('-').toLowerCase();
    return (
      <Typography
        className="mb-3 mt-8 tracking-wide"
        id={slugify(id)}
        variant="h2"
        tag="h2"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = (props.children as string).split(' ').join('-').toLowerCase();
    return (
      <Typography
        className="mb-4 mt-10 font-normal tracking-wide"
        id={slugify(id)}
        variant="h3"
        tag="h3"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <Typography
        className="-mt-24 pt-24 font-light tracking-wide"
        variant="p"
        tag="p"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  pre: ({ className, children, ...props }: any) => {
    return (
      <div>
        <CopyButton
          className="absolute right-0 z-10 p-4"
          value={children.props.children}
        />
        <pre
          className={cn(
            'mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-white p-4 dark:bg-zinc-900',
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded text-sm text-black dark:text-white',
        className
      )}
      {...props}
    />
  ),
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
