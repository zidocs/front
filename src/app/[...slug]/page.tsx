import { Typography } from '@/components/mdx/typography';
import { getMdxBySlug, getAllData } from '@/lib/mdx';
import { redirect } from 'next/navigation';
import config from '../../../public/starter-kit/zidocs.json';
import { Metadata, ResolvingMetadata } from 'next';
import { RightSideBar } from '@/components/right-side-bar';
import { baseTextColor, cn } from '@/lib/utils';

export const dynamic = 'error';
export const dynamicParams = false;

export async function generateStaticParams() {
  const data = await getAllData();
  const arr: { slug: string[] }[] = [];
  data.forEach((item) => {
    item.groups.forEach((group) =>
      group.pages.forEach((page) => {
        arr.push({ slug: page.href.split('/') });
      })
    );
  });

  return arr;
}

export async function generateMetadata(
  { params }: { params: { slug: string[] } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const mdx = await getMdxBySlug(params.slug.join('/'));

  const parentTitle = (await parent).title?.absolute;

  return {
    title: `${mdx?.meta.title} - ${parentTitle}`,
  };
}

export interface PageProps {
  params: { slug: string[] };
}

export default async function Page({ params }: PageProps) {
  const mdx = await getMdxBySlug(params.slug.join('/'));
  const data = await getAllData();

  if (!mdx) {
    redirect(`/${config.navigation[0].pages[0]}`);
  }

  return (
    <div className="flex justify-center gap-12 p-6 lg:pl-[20rem]">
      <div className="relative w-full max-w-3xl grow overflow-hidden pb-10 xl:max-w-[49rem] xl:pl-14">
        <div>
          <div className="mb-6 flex flex-col gap-2">
            <Typography
              className="text-sm text-primary"
              variant="h6"
              tag="span"
            >
              {mdx.meta.groupName}
            </Typography>
            <Typography variant="h1" tag="h1">
              {mdx.meta.title}
            </Typography>
            <Typography variant="h4" tag="h2" className="font-light opacity-70">
              {mdx.meta.description}
            </Typography>
          </div>
          <article
            className={cn(
              baseTextColor,
              'prose prose-zinc relative mt-8 max-w-none dark:prose-invert prose-code:py-2 '
            )}
          >
            {mdx.content}
          </article>
        </div>
      </div>
      <div className="hidden w-[19rem] flex-none pl-10 xl:flex">
        <RightSideBar data={data} toc={mdx.meta.toc} />
      </div>
    </div>
  );
}
