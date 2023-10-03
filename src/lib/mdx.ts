import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '../components/mdx';
import config from '../../public/starter-kit/zidocs.json';

export interface IMDXFile {
  MDXComponent: React.ReactNode;
  meta: IMDXMeta;
}

export interface IMDXMeta {
  title: string;
  description: string;
  additionalProperties?: any;
}

export interface DataFromConfig {
  name: string;
  pages: PageFromConfig[];
}

export interface PageFromConfig {
  title: string;
  href: string;
  group?: string;
  content: string;
}

const FOLDER_PATH = path.join(process.cwd(), 'public/starter-kit');

export const getMdxBySlug = async (
  slug: string,
  additionalProperties?: any
) => {
  try {
    const fileSlug = slug.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`${FOLDER_PATH}/${fileSlug}.mdx`, {
      encoding: 'utf-8',
    });
    const { frontmatter, content } = await compileMDX({
      source: fileContent,
      options: {
        parseFrontmatter: true,
      },
      components,
    });

    const groupName = getGroupName(slug);

    return {
      meta: { ...frontmatter, ...additionalProperties, groupName },
      content,
    };
  } catch (err) {
    //console.log(err);
  }
};

export const getMdxMetaDataBySlug = async (
  slug: string,
  additionalProperties?: any
) => {
  try {
    const fileSlug = slug.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`${FOLDER_PATH}/${fileSlug}.mdx`, {
      encoding: 'utf-8',
    });

    const { frontmatter } = await compileMDX({
      source: fileContent,
      options: {
        parseFrontmatter: true,
      },
    });

    return {
      meta: { ...frontmatter, ...additionalProperties },
      content: fileContent,
    };
  } catch (err) {
    //console.log(err);
  }
};

export const getSideBarData = async () => {
  const promisesArray = config.navigation.map(async ({ group, pages }) => {
    return Promise.all(
      pages.map(async (page) => {
        const mdx = await getMdxMetaDataBySlug(page, { group, filePath: page });
        return mdx;
      })
    );
  });

  const mdxData = await Promise.all(promisesArray);
  const mdxDataFormatted = mdxData.map((arr) => {
    const pages = arr.map(({ meta, content }: any) => {
      return {
        title: meta.title,
        href: meta.filePath,
        group: meta.group,
        content,
      };
    });

    return {
      name: arr[0]?.meta.group as string,
      pages: pages,
    };
  });

  return mdxDataFormatted;
};

export const getGroupName = (pageName: string) => {
  return config.navigation.find((group) => {
    return group.pages.find((page) => pageName == page);
  })?.group;
};
