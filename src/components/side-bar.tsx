'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { Typography } from './mdx/typography';
import { DataFromConfig, GroupFromConfig, PageFromConfig } from '@/lib/mdx';
import { Icon } from './ui/icon';

export const dynamic = 'error';

interface ISideBarSubItem extends PageFromConfig {
  onClick?: () => void;
}

interface ISideBarItem extends GroupFromConfig {
  onClick?: () => void;
}

interface ISideBar extends DataFromConfig {
  onClick?: () => void;
}

function SideBarSubItem({ title, href, icon, onClick }: ISideBarSubItem) {
  const pathname = usePathname();

  return (
    <Link
      href={`/${href}`}
      className={cn(
        buttonVariants({
          variant: 'ghost',
        }),
        pathname === `/${href}`
          ? 'bg-muted bg-opacity-10 text-primary opacity-100 hover:text-primary dark:text-primary'
          : 'opacity-60 hover:opacity-80',
        'flex h-auto w-full items-center justify-start gap-2 font-normal tracking-wide hover:bg-muted hover:bg-opacity-10'
      )}
      onClick={onClick}
    >
      {icon && (
        <Icon
          name={icon}
          className={cn(
            'min-w-[14px] text-center',
            pathname === `/${href}`
              ? 'text-primary opacity-100 dark:text-primary'
              : 'base-text-color'
          )}
        />
      )}
      <Typography
        variant="span"
        className={cn(
          `space-x-2.5 text-base font-light lg:text-sm`,
          pathname === `/${href}` && 'font-medium'
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
    }) || data[0];

  return (
    <div
      className={cn(
        `${
          !open && 'hidden'
        }  w-[20rem] lg:block lg:w-[18rem] lg:pt-6 lg:opacity-100 ${className}`
      )}
    >
      <div className="space-y-4">
        <ScrollArea className="flex h-[100vh] flex-col gap-4 pb-10">
          {actualTab.groups.map((item) => {
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
