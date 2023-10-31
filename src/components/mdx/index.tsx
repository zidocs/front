import React from 'react';
import { Typography } from './typography';
import { baseTextColor, cn } from '@/lib/utils';
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
import { Check, Note, Tip, Warning, Info } from '../ui/callout-box';

export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <h1 className="scroll-mt-36 tracking-wide" {...props}>
        {props.children}
      </h1>
    );
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <h2 className="scroll-mt-36 tracking-wide" {...props}>
        {props.children}
      </h2>
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <h3 className="scroll-mt-36 font-semibold tracking-wide " {...props}>
        {props.children}
      </h3>
    );
  },
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <p className="font-light tracking-wide" {...props}>
        {props.children}
      </p>
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
    const lang = props['data-language'];
    const theme = props['data-theme'];

    return (
      <div
        className={cn(
          theme === 'dark'
            ? 'relative hidden dark:block'
            : 'relative block dark:hidden'
        )}
      >
        <pre
          className="max-h-[650px] w-full overflow-x-auto rounded-xl border bg-white px-4 py-4 dark:border-zinc-300 dark:border-opacity-20 dark:bg-zinc-950"
          {...props}
        >
          {children}
        </pre>
        <CopyButton className="absolute right-4 top-6" text={props.raw} />
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn('text-sm tracking-wider', className)} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-inside list-decimal" {...props}>
      {props.children}
    </ol>
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('font-light tracking-wide', baseTextColor)} {...props}>
      {props.children}
    </li>
  ),
  Accordion: (
    props: AccordionSingleProps & { icon: string; title: string }
  ) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={props.title}>
        <AccordionTrigger>
          {props.icon && (
            <span className="absolute">
              <Github size={16} />
            </span>
          )}
          <div className={cn(props.icon && 'pl-6')}>{props.title}</div>
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
