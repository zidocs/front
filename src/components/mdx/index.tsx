import { Typography } from './typography';

export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      className="-mt-24 pt-24 tracking-wide"
      variant="h1"
      tag="h1"
      {...props}
    >
      {props.children}
    </Typography>
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = (props.children as string).split(' ').join('-').toLowerCase();
    return (
      <Typography
        className="-mt-24 pt-24 tracking-wide"
        id={id}
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
        className="-mt-20 py-2 pt-20 font-medium tracking-wide"
        id={id}
        variant="h3"
        tag="h3"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      className="-mt-24 pt-24 tracking-wide"
      variant="p"
      tag="p"
      {...props}
    >
      {props.children}
    </Typography>
  ),
};
