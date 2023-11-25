'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataFromConfig } from '@/lib/mdx';
import { cn, getActualTab, slugify } from '@/lib/utils';
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
  data: DataFromConfig[];
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
        {data.map((tab: DataFromConfig) => {
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
                      ? 'flex gap-2 text-base font-semibold  text-white data-[state=active]:decoration-transparent [&>svg]:hover:text-primary'
                      : 'tab-inactive'
                  }`,
                  'tab-active text-normal pl-0 font-normal tracking-wide text-black hover:text-opacity-100 dark:text-white'
                )}
                onClick={() => setOpen && setOpen(false)}
                value={slugify(tab.tabName)}
              >
                <Icon
                  name="book-open"
                  size="1x"
                  className="rounded-sm lg:hidden"
                />
                {tab.tabName}
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
