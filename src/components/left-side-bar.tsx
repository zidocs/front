'use client';

import { usePathname } from 'next/navigation';
import { DataFinal, DataFromConfig, PageFromConfig } from '@/lib/mdx';
import { cn, countOccur, getActualPage, slugify } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const dynamic = 'error';

interface LeftSideBarProps {
  data: DataFinal[];
}

interface LeftSideBarItem {
  href: string;
  name?: string;
  children?: { href: string; name: string }[];
}

function simpleSearch(arr: string[]) {
  const indices = [];
  let lastTitleIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('##') !== -1) {
      if (arr[i].indexOf('###') !== -1) {
        const parentIndex: { index: number; children?: number[] } =
          indices[lastTitleIndex];
        if (parentIndex.children) {
          indices[lastTitleIndex] = {
            index: parentIndex.index,
            children: [...parentIndex.children, i],
          };
        } else {
          indices[lastTitleIndex] = {
            index: parentIndex.index,
            children: [i],
          };
        }
      } else {
        lastTitleIndex = indices.length;

        indices.push({ index: i });
      }
    }
  }

  return indices;
}

export function LeftSideBar({ data }: LeftSideBarProps) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    parentId?: string;
  } | null>();
  const [result, setResult] = useState<LeftSideBarItem[]>([]);

  const actualPage = getActualPage(data, pathname);

  useEffect(() => {
    try {
      if (!actualPage || !actualPage?.content) {
        return;
      }

      const arr = actualPage?.content.split('\n');

      const indexes = simpleSearch(arr as string[]);

      let names: string[] = [];
      const result = indexes.map(({ index, children }) => {
        const originalName = arr?.[index].trim() as string;
        let href = slugify(originalName);
        const childArr =
          children && children.length > 0
            ? children.map((childIndex) => {
                const childName = arr?.[childIndex]
                  .replace(/^#+/, '')
                  .trim() as string;
                const childHref = slugify(childName);
                return { name: childName, href: childHref };
              })
            : [];

        const count = countOccur(href, names);
        if (count > 0) {
          href = `${href}-${count + 1}`;
        }
        names.push(href);

        return {
          name: originalName.replace(/[^a-zA-Z0-9]+/g, ' '),
          href,
          children: childArr,
        };
      });

      setResult([...result]);
    } catch (err) {
      console.log(err);
    }
  }, [actualPage]);

  const handleScroll = () => {
    const sections: {
      id: string;
      ref: any;
      parentId?: string;
    }[] = [];

    result.forEach(({ href, children }) => {
      sections.push({
        id: href,
        ref: document.getElementById(href),
      });

      if (children) {
        const result = children.map((child) => ({
          id: child.href,
          parentId: href,
          ref: document.getElementById(child.href),
        }));

        sections.push(...result);
      }
    });

    const currentSection = sections.find((section) => {
      if (section.ref) {
        const rect = section.ref.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      }
      return false;
    });

    if (currentSection) {
      setSelectedItem({
        id: currentSection.id,
        parentId: currentSection.parentId,
      });
    } else {
      setSelectedItem(null);
    }
  };

  const handleClick = (id: string, parentId?: string) => {
    setSelectedItem({
      id,
      parentId,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [result]);

  useEffect(() => {
    try {
      if (!actualPage || !actualPage?.content) {
        return;
      }

      const arr = actualPage?.content.split('\n');
      const indexes = simpleSearch(arr as string[]);
      if (indexes.length > 0) {
        setSelectedItem({
          id: slugify(arr?.[indexes[0].index].trim() as string),
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [actualPage]);

  return (
    <ul className="fixed flex flex-col gap-1 text-sm">
      {result.map(({ href, name, children }) => {
        return (
          <li key={href}>
            <Link
              onClick={() => handleClick(href)}
              className={cn(
                selectedItem?.id === href || selectedItem?.parentId === href
                  ? 'leading-7 text-primary opacity-100'
                  : 'leading-7 opacity-60 hover:opacity-80'
              )}
              id={href}
              key={href}
              href={`#${href}`}
            >
              {name}
            </Link>
            {children?.map((child) => {
              return (
                <div key={child.href} className="pl-4">
                  <Link
                    onClick={() => handleClick(child.href, href)}
                    className={cn(
                      selectedItem?.id === child.href
                        ? 'leading-7 text-primary opacity-100'
                        : 'leading-7 opacity-60 hover:opacity-80'
                    )}
                    id={child.href}
                    key={child.href}
                    href={`#${child.href}`}
                  >
                    {child.name}
                  </Link>
                </div>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
}
