'use client';

import { ClipboardCheckIcon, Clipboard } from 'lucide-react';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <span
      className={cn(
        'cursor-pointer text-opacity-20 hover:text-opacity-40',
        className
      )}
      onClick={() => {
        copy(value.trim());

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);

        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <ClipboardCheckIcon className="stroke-green-400" size="18" />
      ) : (
        <Clipboard
          className="stroke-zinc-500 hover:stroke-zinc-400"
          size="18"
        />
      )}
    </span>
  );
}
