'use client';

import { ClipboardCheckIcon, Clipboard } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <span
      className={cn(
        'cursor-pointer text-opacity-20 hover:text-opacity-40',
        className
      )}
      onClick={() => {
        copy();

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
