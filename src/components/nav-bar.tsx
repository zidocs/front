'use client';

import { useEffect, useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { Search } from './ui/search';
import { Sidebar } from './side-bar';
import { usePathname } from 'next/navigation';
import { DataFromConfig, ZidocsConfig } from '@/lib/mdx';
import { TabsMenu } from './tabs-menu';
import { cn, getActualPage } from '@/lib/utils';
import { ChevronRight, Menu } from 'lucide-react';

interface NavBarProps {
  data: DataFromConfig[];
  config: ZidocsConfig;
}
export function NavBar({ data, config }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isOpen]);

  let actualPage = getActualPage(data, pathname);

  return (
    <>
      <div className="sticky top-0 z-30 m-auto mb-4 flex max-w-8xl flex-col pt-1 backdrop-blur-md">
        <div className="border-0 border-black dark:border-white dark:border-opacity-10 lg:border-b lg:border-opacity-5">
          <div className="flex items-center gap-2 border-b border-primary border-opacity-5 p-2 px-4 lg:p-4 lg:px-12">
            <img
              className="hidden dark:block"
              src={`/${config.logo?.dark}`}
              width={100}
            />
            <img
              className="hidden light:block"
              src={`/${config.logo?.light}`}
              width={100}
            />
            <div className="ml-auto flex items-center space-x-4">
              <Search data={data} />
              <ModeToggle />
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 text-sm lg:hidden">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="opacity-70 lg:hidden"
            >
              <Menu className="p-0" size={20} />
            </button>
            <span className="opacity-70">{actualPage?.group}</span>
            <span className="opacity-70">
              <ChevronRight size={14} />
            </span>
            <span>{actualPage?.title}</span>
          </div>
        </div>
        <div className="border-b border-black border-opacity-5 px-4 dark:border-white dark:border-opacity-10">
          <TabsMenu className="hidden lg:block" data={data} />
        </div>
      </div>

      {isOpen && (
        <div
          className={cn(
            `${
              isOpen
                ? 'fixed bottom-0 left-0 top-0 z-40 m-0 block w-full bg-background'
                : 'hidden'
            }`,
            'w-fit py-3 lg:hidden'
          )}
        >
          <TabsMenu open={isOpen} setOpen={setIsOpen} data={data} />
          <Sidebar
            className="py-6 pl-4 pr-8 lg:hidden"
            data={data}
            open={isOpen}
            setOpen={setIsOpen}
          />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-30 transition-opacity lg:hidden">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex={0}
          ></div>
        </div>
      )}
    </>
  );
}
