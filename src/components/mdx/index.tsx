import React from 'react';
import { Typography } from './typography';
import { baseTextColor, cn, slugify } from '@/lib/utils';
import { CopyButton } from '../ui/copy-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import type { AccordionSingleProps } from '@radix-ui/react-accordion';
import { Github } from 'lucide-react';
import { Picture } from '../ui/picture';
import { v4 as uuidV4 } from 'uuid';
import {
  CalloutBoxProps,
  Check,
  Note,
  Tip,
  Warning,
  Info,
} from '../ui/callout-box';

const generateUuid = (str: any) => {
  let id: string[] | string = [uuidV4()];

  if (!Array.isArray(str)) {
    id = (str as string).split(' ');
  }
  id = (str as string[]).join('-').toLowerCase();

  return id;
};
export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <Typography
        className="scroll-mt-36 tracking-wide"
        variant="h1"
        tag="h1"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <Typography
        className="mb-6 mt-12 scroll-mt-36 tracking-wide"
        variant="h2"
        tag="h2"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <Typography
        className="mb-4 mt-12 scroll-mt-36 font-bold tracking-wide"
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
        className="font-light tracking-wide"
        variant="p"
        tag="p"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => {
    return (
      <a
        className="border-b-[1px] border-primary text-black hover:border-b-2 dark:text-white"
        {...props}
        target="_blank"
      >
        {props.children}
      </a>
    );
  },
  pre: ({ className, children, ...props }: any) => {
    return (
      <div>
        <CopyButton
          className="absolute right-0 z-10 p-5"
          value={'children.props.children'}
        />
        <pre
          className={cn(
            'mb-4 max-h-[650px] overflow-x-auto rounded-xl border border-opacity-25 bg-white px-3 py-4 dark:bg-zinc-950',
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
      className={cn('relative rounded text-sm tracking-wider', className)}
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-inside list-decimal" {...props}>
      {props.children}
    </ol>
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className={cn('my-2 text-base font-light tracking-wide', baseTextColor)}
      {...props}
    >
      {props.children}
    </li>
  ),
  Accordion: (
    props: AccordionSingleProps & { icon: string; title: string }
  ) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="1">
        <AccordionTrigger>
          {props.icon && (
            <span className="absolute">
              <Github size={16} />
            </span>
          )}
          <div className={props.icon && 'pl-6'}>{props.title}</div>
        </AccordionTrigger>
        <AccordionContent>{props.children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  Picture: Picture,
  // Callout Boxes
  Note: Note,
  Warning: Warning,
  Info: Info,
  Tip: Tip,
  Check: Check,
};
