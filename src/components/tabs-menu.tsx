'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataFinal } from '@/lib/mdx';
import { baseTextColor, cn, getActualTab, slugify } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './ui/icon';

export function TabsMenu({
  data,
  className,
  open,
  setOpen,
}: {
  data: DataFinal[];
  className?: string;
  open?: boolean;
  setOpen?: (status: boolean) => void;
}) {
  const pathname = usePathname();
  const [actualTab, setActualTab] = useState(getActualTab(data, pathname));

  useEffect(() => {
    setActualTab(getActualTab(data, pathname));
  }, [pathname]);

  return (
    <Tabs
      className={className}
      value={slugify(actualTab.tabName)}
      defaultValue={slugify(actualTab.tabName)}
    >
      <TabsList
        className={cn(
          `${open && 'h-fit w-full flex-col items-start py-8 pl-8 !font-bold'}`,
          'flex justify-start gap-2 bg-transparent p-6 pl-[1.65rem] lg:gap-4'
        )}
      >
        {data.map((tab: DataFinal) => {
          const firstPageHref = `/${tab.groups[0].pages[0].href}`;
          return (
            <Link
              className={`${open && 'w-full px-2 hover:text-opacity-70'}`}
              key={firstPageHref}
              href={firstPageHref}
            >
              <TabsTrigger
                className={cn(
                  `${
                    open
                      ? 'flex gap-2 text-base font-semibold data-[state=active]:text-primary data-[state=inactive]:opacity-70 data-[state=inactive]:hover:opacity-90  data-[state=active]:dark:text-primary [&>svg]:hover:text-primary'
                      : 'data-[state=active]:text-foreground data-[state=inactive]:text-opacity-70 data-[state=active]:underline data-[state=active]:decoration-primary data-[state=active]:underline-offset-[1.165rem] data-[state=inactive]:hover:text-opacity-90 data-[state=inactive]:hover:underline data-[state=inactive]:hover:decoration-zinc-200 data-[state=inactive]:hover:underline-offset-[1.165rem] data-[state=inactive]:dark:text-opacity-70 data-[state=inactive]:dark:hover:text-opacity-90  dark:data-[state=inactive]:hover:decoration-zinc-700'
                  }`,
                  'text-normal pl-0 font-normal tracking-wide hover:text-opacity-70'
                )}
                onClick={() => setOpen && setOpen(false)}
                value={slugify(tab.tabName)}
              >
                <Icon name="bookOpen" className="rounded-sm lg:hidden" />
                {tab.tabName}
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
