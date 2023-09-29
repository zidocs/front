import { Typography } from './typography';

export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography className="tracking-wide" variant="h1" tag="h1" {...props}>
      {props.children}
    </Typography>
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = (props.children as string).split(' ').join('-').toLowerCase();
    return (
      <Typography
        className="tracking-wide"
        id={id}
        variant="h2"
        tag="h2"
        {...props}
      >
        {props.children}
      </Typography>
    );
  },
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography className="tracking-wide" variant="p" tag="p" {...props}>
      {props.children}
    </Typography>
  ),
};
