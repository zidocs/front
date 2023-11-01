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
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => {
    return (
      <a
        className="tracking-wider text-black decoration-primary hover:border-0 dark:text-white"
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
          className="max-h-[650px] w-full overflow-x-auto rounded-xl border bg-white px-4 py-3 pr-10 dark:border-zinc-300 dark:border-opacity-20 dark:bg-zinc-950 [&>code]:overflow-scroll"
          {...props}
        >
          {children}
        </pre>
        <CopyButton className="absolute right-4 top-6" text={props.raw} />
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn('!font-firacode tracking-wider', className)}
      {...props}
    />
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
  // Callout Boxes
  Note: Note,
  Warning: Warning,
  Info: Info,
  Tip: Tip,
  Check: Check,
};
