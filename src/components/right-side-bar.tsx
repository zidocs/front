'use client';

import { usePathname } from 'next/navigation';
import { DataFromConfig, TableOfContent } from '@/lib/mdx';
import { cn, getActualPage } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const dynamic = 'error';

interface RightSideBarProps {
  data: DataFromConfig[];
}

interface RightSideBarItem {
  href: string;
  name?: string;
  depth?: number;
}

export function RightSideBar({ data }: RightSideBarProps) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
  } | null>();
  const [result, setResult] = useState<RightSideBarItem[]>([]);

  const actualPage = getActualPage(data, pathname);
  useEffect(() => {
    try {
      if (!actualPage || !actualPage?.content) {
        return;
      }

      const result = actualPage.toc.map(({ depth, value, id }) => {
        return {
          name: value,
          href: id,
          depth: depth,
        };
      });

      setSelectedItem({
        id: result[0].href,
      });

      setResult([...result]);
    } catch (err) {
      console.log(err);
    }
  }, [actualPage]);

  useEffect(() => {
    try {
      if (!actualPage) {
        return;
      }

      const result = actualPage.toc.map(({ depth, value, id }) => {
        return {
          name: value,
          href: id,
          depth: depth,
        };
      });

      setSelectedItem({
        id: result[0].href,
      });

      setResult([...result]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleScroll = () => {
    const sections: {
      id: string;
      ref: any;
      parentId?: string;
    }[] = [];

    result.forEach(({ href }) => {
      sections.push({
        id: href,
        ref: document.getElementById(href),
      });
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
      });
    }
  };

  const handleClick = (id: string) => {
    setSelectedItem({
      id,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [result]);

  return (
    <ul className="fixed flex flex-col gap-1 text-sm">
      {result.map(({ href, name, depth }) => {
        let style;
        switch (depth) {
          case 5:
            style = 'ml-8';
            break;
          case 4:
            style = 'ml-6';
            break;
          case 3:
            style = 'ml-4';
            break;
          case 2:
            style = 'ml-2';
            break;
        }

        return (
          <li key={href} className={style}>
            <Link
              onClick={(e) => handleClick(href)}
              className={cn(
                selectedItem?.id === href
                  ? 'leading-7 text-primary opacity-100'
                  : 'leading-7 opacity-60 hover:opacity-80'
              )}
              id={href}
              key={href}
              href={`#${href}`}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
