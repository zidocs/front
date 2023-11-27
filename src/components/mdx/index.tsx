import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CopyButton } from '../ui/copy-button';
import { AccordionGroup, AccordionMDX } from '../ui/accordion';
import { Check, Note, Tip, Warning, Info } from '../ui/callout-box';
import { ResponseField } from '../ui/response-field';
import { Expandable } from '../ui/expandable';
import { CardClickable } from '../ui/card';
import { CardGroup } from '../ui/card-group';
import { Picture } from '../ui/picture';
import { Code, CodeGroup, Pre } from '../ui/code';
import { Step, Steps } from '../ui/steps';

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
  pre: Pre,
  code: Code,
  CodeGroup: CodeGroup,
  Accordion: AccordionMDX,
  AccordionGroup: AccordionGroup,
  // Components
  ResponseField: ResponseField,
  Expandable: Expandable,
  Steps: Steps,
  Step: Step,
  Card: CardClickable,
  CardGroup: CardGroup,
  Image: Picture,
  // Callout Boxes
  Note: Note,
  Warning: Warning,
  Info: Info,
  Tip: Tip,
  Check: Check,
};
