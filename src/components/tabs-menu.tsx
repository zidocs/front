'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataFinal } from '@/lib/mdx';
import { cn, getActualTab, slugify } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
          `${open && 'flex flex-col items-start py-8 pl-8'}`,
          'flex gap-2 bg-transparent lg:gap-4'
        )}
      >
        {data.map((tab: DataFinal) => {
          const firstPageHref = `/${tab.groups[0].pages[0].href}`;
          return (
            <Link key={firstPageHref} href={firstPageHref}>
              <TabsTrigger
                className="text-normal pl-0 font-normal tracking-wide"
                onClick={() => setOpen && setOpen(false)}
                value={slugify(tab.tabName)}
              >
                {tab.tabName}
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
