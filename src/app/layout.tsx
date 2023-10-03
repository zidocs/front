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

          <div className="m-auto max-w-8xl">
            <Sidebar className="fixed w-[18rem] lg:pl-8" data={data} />
            <div className="w-full p-6 lg:pl-[20rem] xl:max-w-5xl">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}