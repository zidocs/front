'use client';

import { cn, slugify } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { ReactNode, useState } from 'react';

const Pre = ({ children, className, raw, tabs, ...props }: any) => {
  const lang = props['data-language'];
  const theme = props['data-theme'];
  const name = props['data-name'];

  return (
    <div
      className={cn(
        theme === 'dark'
          ? 'relative hidden dark:block'
          : 'relative block dark:hidden',
        'base-border-color my-6 max-h-[650px] w-full overflow-x-auto rounded-xl border bg-white leading-6 children:!my-0 children:!shadow-none dark:bg-zinc-950'
      )}
    >
      {name && !tabs && (
        <div className="base-border-color border-b bg-white text-xs text-primary dark:bg-black">
          <div className="h-full w-fit border-b border-primary p-3 px-4 pt-4 font-medium">
            {name}
          </div>
        </div>
      )}

      <CopyButton
        className={cn(
          'absolute right-4 top-5 !font-normal',
          name && 'top-[0.8rem]'
        )}
        text={raw}
      />

      <pre
        className={cn(
          'max-h-64 !bg-transparent [&>code]:overflow-auto',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
};

const Code = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <code className={cn('!font-firacode tracking-wider', className)} {...props} />
);

interface ChildrenCodeGroup {
  props: {
    children: {
      props: {
        raw: string;
        'data-name': string;
        children: ReactNode;
      };
    }[];
  };
}

const CodeGroup = ({ children }: { children: React.ReactNode }) => {
  if (
    children === undefined ||
    children === null ||
    !Array.isArray(children) ||
    children.length < 1
  ) {
    return <div>Code Group syntax error</div>;
  }

  const firstChildren =
    Array.isArray(children) && children[0].props.children[0].props['data-name'];

  const tabs = children as ChildrenCodeGroup[];
  return (
    <div
      className={cn(
        'base-border-color my-6 max-h-[650px] w-full overflow-x-auto rounded-xl border bg-white leading-6 children:!my-0 children:!shadow-none dark:bg-zinc-950'
      )}
    >
      <Tabs className="relative" defaultValue={slugify(firstChildren)}>
        <TabsList className="base-border-color relative flex h-auto w-full justify-start rounded-none border-b bg-transparent bg-white !p-0 dark:bg-black ">
          {tabs.map((child: ChildrenCodeGroup) => {
            const name = child.props.children[0].props['data-name'];
            return (
              <TabsTrigger
                className="h-full w-fit rounded-none px-4 pb-2 pt-3 data-[state=active]:border-b data-[state=active]:border-primary data-[state=active]:text-primary"
                key={slugify(name)}
                value={slugify(name)}
              >
                <div className="rounded-lg px-2 pb-1 pt-1 text-xs font-medium hover:bg-zinc-800 hover:text-primary">
                  {child.props.children[0].props['data-name']}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {tabs.map((child) =>
          child.props.children.map((childTheme: any) => {
            const theme = childTheme.props['data-theme'];
            const name = childTheme.props['data-name'];

            return (
              <TabsContent
                className={cn(
                  theme === 'dark'
                    ? 'relative hidden dark:block'
                    : 'relative block dark:hidden',
                  '!m-0'
                )}
                key={slugify(name)}
                value={slugify(name)}
              >
                <pre className="!my-0 !bg-transparent [&>code]:overflow-auto">
                  {childTheme.props.children}
                </pre>
                <CopyButton
                  className="absolute right-4 top-3 !font-normal data-[state=inactive]:hidden"
                  text={child.props.children[0].props.raw}
                />
              </TabsContent>
            );
          })
        )}
      </Tabs>
    </div>
  );
};

export { Pre, Code, CodeGroup };
