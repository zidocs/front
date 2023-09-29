// types/mdx.d.ts
declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  let meta: { title: string; description: string };
  export default MDXComponent;
  export const meta;
}
