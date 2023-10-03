'use client';

import { usePathname } from 'next/navigation';
import { DataFromConfig } from '@/lib/mdx';
import { slugify } from '@/lib/utils';
import { useState } from 'react';

interface LeftSideBarProps {
  data: DataFromConfig[];
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

export function LeftSideBar({ data }: LeftSideBarProps) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  const actualPage = data
    .find((group) => {
      return group.pages.find((page) => `/${page.href}` == pathname);
    })
    ?.pages.find((page) => `/${page.href}` == pathname);

  const arr = actualPage?.content.split('\n');
  const indexs = simpleSearch(arr as string[], '##');
  const teste = indexs.map((i) => {
    const result = slugify(arr?.[i].trim() as string);
    return {
      name: arr?.[i].trim(),
      href: result,
    };
  });

  return (
    <ul className="fixed flex flex-col gap-3">
      {teste.map((page, index) => {
        return (
          <li key={page.href}>
            <a
              onClick={() => handleItemClick(index)}
              className={index === selectedItem ? 'text-primary' : ''}
              href={`#${page.href}`}
            >
              {page.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
