'use client';

import { baseTextColor, cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { Typography } from './mdx/typography';
import { DataFromConfig, PageFromConfig, DataFinal } from '@/lib/mdx';

export const dynamic = 'error';

interface ISideBarSubItem extends PageFromConfig {
  onClick?: () => void;
}

interface ISideBarItem extends DataFromConfig {
  onClick?: () => void;
}

interface ISideBar extends DataFinal {
  onClick?: () => void;
}

function SideBarSubItem({ title, href, onClick }: ISideBarSubItem) {
  const pathname = usePathname();

  return (
    <Link
      href={`/${href}`}
      className={cn(
        buttonVariants({
          variant: 'ghost',
        }),
        baseTextColor,
        `h-10 w-full justify-start font-normal tracking-wide hover:bg-muted hover:bg-opacity-10 lg:h-8`,
        pathname === `/${href}` &&
          'bg-muted bg-opacity-10 text-primary opacity-100 hover:bg-opacity-10 hover:text-primary dark:text-primary'
      )}
      onClick={onClick}
    >
      <Typography
        variant="span"
        className={cn(
          `text-base font-light dark:opacity-70 lg:text-sm`,
          pathname === `/${href}` && 'font-medium dark:opacity-100'
        )}
      >
        {title}
      </Typography>
    </Link>
  );
}

function SideBarItem({ name, pages, onClick }: ISideBarItem) {
  return (
    <div className="pb-12 font-medium">
      <h2 className=" mb-3 px-4 text-lg tracking-wide lg:text-sm">{name}</h2>
      <div className="space-y-1">
        {pages.map((data: ISideBarSubItem) => {
          return <SideBarSubItem onClick={onClick} key={data.href} {...data} />;
        })}
      </div>
    </div>
  );
}

export function Sidebar({
  data,
  open,
  setOpen,
  className,
}: {
  data: ISideBar[];
  open?: boolean;
  setOpen?: (status: boolean) => void;
  className?: string;
}) {
  const pathname = usePathname();

  const actualTab =
    data.find((group) => {
      const foundPageInGroups = group.groups.find((innerGroup) =>
        innerGroup.pages.find((page) => `/${page.href}` === pathname)
      );

      return foundPageInGroups;
    }) ?? data[0];

  return (
    <div
      className={cn(
        `${
          !open && 'hidden'
        }  w-[18rem] transition-all lg:block lg:pt-6 lg:opacity-100 ${className}`
      )}
    >
      <div className="space-y-4">
        <ScrollArea className="flex h-[100vh] flex-col gap-4 pb-10">
          {actualTab.groups.map((item: any) => {
            return (
              <SideBarItem
                onClick={() => setOpen && setOpen(false)}
                key={item.name}
                {...item}
              />
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}
