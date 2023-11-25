'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from './icon';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'base-border-color my-4 rounded-md border bg-white dark:bg-zinc-950',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="!m-0 flex text-base">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between p-4 py-4 font-medium transition-all hover:rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:rounded-none',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden px-4 pb-2 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const AccordionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="base-border-color my-6 divide-y divide-black divide-opacity-5 rounded-md border bg-white dark:divide-white dark:divide-opacity-5 dark:bg-zinc-950 [&>div:first-child>div>h3>button]:!rounded-t-md [&>div>div>h3>button]:!rounded-none [&>div>div]:m-0 [&>div>div]:border-none">
    {children}
  </div>
);

const AccordionMDX = (props: {
  title: string;
  children?: React.ReactNode;
  icon?: string;
}) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={props.title}>
      <AccordionTrigger>
        {props.icon && (
          <span className="absolute min-w-[20px] max-w-[20px] text-center">
            <Icon name={props.icon} size="1x" />
          </span>
        )}
        <div className={cn(props.icon && 'pl-8')}>{props.title}</div>
      </AccordionTrigger>
      <AccordionContent>{props.children}</AccordionContent>
    </AccordionItem>
  </Accordion>
);

export {
  Accordion,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionMDX,
};
