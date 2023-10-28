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
          `${open && 'flex-col items-start py-8 pl-8'}`,
          'flex justify-start gap-2 bg-transparent p-6 pl-[1.65rem] lg:gap-4'
        )}
      >
        {data.map((tab: DataFinal) => {
          const firstPageHref = `/${tab.groups[0].pages[0].href}`;
          return (
            <Link key={firstPageHref} href={firstPageHref}>
              <TabsTrigger
                className="text-normal pl-0 font-normal tracking-wide data-[state=active]:text-foreground data-[state=active]:underline data-[state=active]:decoration-primary data-[state=active]:underline-offset-[1.165rem] data-[state=inactive]:hover:underline data-[state=inactive]:hover:decoration-zinc-200 data-[state=inactive]:hover:underline-offset-[1.165rem] dark:data-[state=inactive]:hover:decoration-zinc-700"
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
