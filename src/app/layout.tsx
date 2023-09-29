import { ThemeProvider } from '../providers/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import config from '../../public/starter-kit/zidocs.json';
import { Sidebar } from '@/components/side-bar';
import { cn } from '@/lib/utils';

import { getSideBarData } from '@/lib/mdx';
import { NavBar } from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.name,
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSideBarData();

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`/starter-kit/${config.favicon}`}
          sizes="32x32"
        />
      </head>
      <body className={cn(`${inter.className}`)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar config={config} data={data} />

          <div className="max-w-8xl m-auto flex justify-center gap-12 lg:justify-normal lg:p-0">
            <Sidebar className="lg:pl-8" data={data} />
            <div className="w-full max-w-3xl pl-4 lg:pl-0 xl:max-w-[49rem]">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
