import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-2xl font-bold',
      h2: 'text-xl font-bold my-4',
      h3: 'text-lg',
      h4: 'text-base',
      h5: 'text-sm',
      h6: 'text-xs',
      p: 'text-base opacity-80 my-2',
      span: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  tag?: TypographyVariant;
}

const Typography = (props: TypographyProps) => {
  const Tag: React.ElementType = props.tag ? `${props.tag}` : 'h6';
  const { variant, className, ...restProps } = props;

  return (
    <Tag
      className={cn(typographyVariants({ variant, className }))}
      {...restProps}
    ></Tag>
  );
};

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
