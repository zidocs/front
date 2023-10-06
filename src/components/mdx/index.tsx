import { Button } from '../ui/button';
import { Typography } from './typography';
import { slugify } from '@/lib/utils';

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
};
