import { Typography } from '@/components/mdx/typography';
import { getMdxBySlug } from '@/lib/mdx';
import { redirect } from 'next/navigation';
import config from '../../../public/starter-kit/zidocs.json';
import { Metadata, ResolvingMetadata } from 'next';

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

export default async function Content({
  params,
}: {
  params: { slug: string[] };
}) {
  const mdx = await getMdxBySlug(params.slug.join('/'));

  if (!mdx) {
    redirect(`/${config.navigation[0].pages[0]}`);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2">
        <Typography className="text-sm text-primary" variant="h6" tag="span">
          {mdx.meta.groupName}
        </Typography>
        <Typography variant="h1" tag="h1">
          {mdx.meta.title}
        </Typography>
        <Typography
          variant="h4"
          tag="h2"
          className="py-4 font-light opacity-70"
        >
          {mdx.meta.description}
        </Typography>
      </div>
      <article className="prose">{mdx.content}</article>
    </div>
  );
}
