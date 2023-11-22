'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Icon } from './ui/icon';
import { motion } from 'framer-motion';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
      <motion.button
        whileTap={{ rotate: 360, scale: 1.2, transition: { duration: 2 } }}
        whileHover={{ scale: 1.2 }}
        className="cursor-pointer"
      >
        <Icon size="lg" name="moon" className="hidden dark:block" />
        <Icon
          size="lg"
          name="sun"
          className="block text-primary dark:hidden "
        />
      </motion.button>
    </div>
  );
}
