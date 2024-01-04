import { Typography } from '@/components/mdx/typography';
import { getMdxBySlug, getAllPagesSlugList, getMdxMetadata } from '@/lib/mdx';
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { configTyped } from '../layout';

export const dynamic = 'error';
export const dynamicParams = false;

//import openapi from '../../../public/api-reference/openapi.json';
//import { OpenAPIV3 } from '@/lib/openapi-types';

export async function generateStaticParams() {
  return getAllPagesSlugList();
}

export async function generateMetadata(
  { params }: { params: { slug: string[] } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metaData = await getMdxMetadata(params.slug.join('/'));

  const parentTitle = (await parent).title?.absolute;

  return {
    title: `${metaData.title} - ${parentTitle}`,
  };
}

export interface PageProps {
  params: { slug: string[] };
}

export default async function Page({ params }: PageProps) {
  const mdx = await getMdxBySlug(params.slug.join('/'));

  //const open = openapi as OpenAPIV3.Document;
  //const paths = Object.keys(open.paths);
  //const methods = Object.keys(open.paths[paths[0]] as object);

  if (!mdx) {
    redirect(`/${configTyped.navigation[0].pages[0]}`);
  }

  return (
    <div className="relative w-full max-w-3xl grow overflow-hidden pb-10 xl:max-w-[49rem] xl:pl-14">
      <div>
        <div className="mb-6 flex flex-col gap-2">
          <Typography className="text-sm text-primary" variant="h6" tag="span">
            {mdx.meta.groupName}
          </Typography>
          <Typography variant="h1" tag="h1">
            {mdx.meta.title}
          </Typography>
          <Typography variant="h4" tag="h2" className="font-light opacity-70">
            {mdx.meta.description}
          </Typography>
        </div>

        {mdx.meta.openapi}
        <article className="base-text-color prose prose-zinc relative mt-8 max-w-none dark:prose-invert prose-code:py-2">
          {/* <Request server={openapi.servers[0]} security={openapi.security} /> */}
          {mdx.content}
        </article>
      </div>
    </div>
  );
}
