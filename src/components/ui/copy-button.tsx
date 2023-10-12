'use client';

import { ClipboardCheckIcon, Clipboard } from 'lucide-react';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <motion.span
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 1.2 }}
      className={cn('cursor-pointer text-opacity-20', className)}
      onClick={() => {
        copy(value.trim());

        setTimeout(() => {
          setIsCopied(false);
        }, 3000);

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
    </motion.span>
  );
}
