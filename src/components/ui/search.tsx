'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import { FileText, SearchIcon } from 'lucide-react';
import React from 'react';
import { DataFinal, PageFromConfig } from '@/lib/mdx';

interface SearchProps {
  data: DataFinal[];
}

export function Search({ data }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = React.useState('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const filterData = data
      .map((tab) => {
        return {
          name: tab.groups[0].name,
          pages: tab.groups[0].pages.filter((page) =>
            page.content.toLowerCase().includes(search.toLowerCase())
          ),
        };
      })
      .filter((group) => (group.pages.length > 0 ? true : false));

    setFilteredData(filterData);
  }, [search]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative justify-start border-transparent bg-transparent p-0 text-sm text-muted-foreground hover:bg-transparent md:w-64 md:border-border md:px-3 md:py-2'
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden md:flex md:items-center md:gap-2">
          <SearchIcon strokeWidth={3} size={16} /> Search...
        </span>
        <span className="inline-flex md:hidden">
          <SearchIcon />
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onValueChange={(e) => {
            setSearch(e);
          }}
          className="bg-background"
          placeholder="Type a command or search..."
        />
        <CommandList className="bg-background">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          {filteredData.map((groups: any) => {
            return (
              <CommandGroup key={groups.name} heading={groups.name}>
                {groups.pages.map((page: PageFromConfig) => {
                  return (
                    <CommandItem
                      key={page.href}
                      onSelect={() => {
                        runCommand(() => router.push(`/${page.href}`));
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {page.title}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
