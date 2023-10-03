'use client';

import { useEffect, useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { Search } from './ui/search';
import { ChevronRight, Menu } from 'lucide-react';
import { Sidebar } from './side-bar';
import { usePathname } from 'next/navigation';
import { DataFromConfig } from '@/lib/mdx';
import { slugify } from '@/lib/utils';

interface NavBarProps {
  data: DataFromConfig[];
  config: any;
}

function simpleSearch(arr: string[], searchParameter: string) {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(searchParameter) !== -1) {
      indices.push(i);
    }
  }
  return indices;
}

export function NavBar({ data, config }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'scroll');
  }, [isOpen]);

  const actualPage = data
    .find((group) => {
      return group.pages.find((page) => `/${page.href}` == pathname);
    })
    ?.pages.find((page) => `/${page.href}` == pathname);

  const arr = actualPage?.content.split('\n');
  const str = slugify(arr?.[6].trim() as string);
  console.log(simpleSearch(arr as string[], '##'));

  return (
    <>
      <div className="sticky top-0 z-30 m-auto mb-4 flex max-w-8xl flex-col backdrop-blur-md">
        <div className="border-b border-primary border-opacity-5">
          <div className="flex items-center gap-2 border-b border-primary border-opacity-5 p-2 px-4 lg:p-4 lg:px-12">
            <img src={`/starter-kit/${config.favicon}`} width={24} />
            {config.name}
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
      </div>

      {isOpen && (
        <Sidebar
          className="py-6 pl-4 pr-8 lg:hidden"
          data={data}
          open={isOpen}
          setOpen={setIsOpen}
        />
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
