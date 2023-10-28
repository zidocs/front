import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '../components/mdx';
import config from '../../public/starter-kit/zidocs.json';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeNestedHeadings } from './utils';

export const configTyped: {
  name: string;
  logo?: {
    dark?: string;
    light?: string;
  };
  favicon?: string;
  colors: {
    primary: string;
    light: string;
    dark: string;
    background?: {
      dark?: string;
      light?: string;
    };
  };
  navigation: {
    group: string;
    pages: string[];
  }[];
  tabs?: {
    name: string;
    groups: string[];
  }[];
} = config;

const rehypePlugins = [
  rehypeHighlight,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behaviour: 'append',
      properties: {
        ariaHidden: true,
        tabIndex: -1,
        className: 'hash-link',
      },
    },
  ],
  emoji,
];
const remarkPlugins = [remarkGfm];

export interface IMDXFile {
  MDXComponent: React.ReactNode;
  meta: IMDXMeta;
}

export interface IMDXMeta {
  title: string;
  description: string;
  toc: any;
  additionalProperties?: any;
}

export interface DataFinal {
  tabName: string;
  groups: DataFromConfig[];
  groupsNames: string[];
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
    const headings: any[] = [];
    const { frontmatter, content } = await compileMDX({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          //@ts-ignore
          rehypePlugins: [
            //@ts-ignore
            ...rehypePlugins,
            //@ts-ignore
            [rehypeNestedHeadings, { headings }],
          ],

          //@ts-ignore
          remarkPlugins,
        },
      },
      components,
    });

    const groupName = getGroupName(slug);

    return {
      meta: {
        ...frontmatter,
        ...additionalProperties,
        groupName,
        toc: headings,
      },
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

    const { frontmatter, ...toc } = await compileMDX({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          //@ts-ignore
          rehypePlugins,
          //@ts-ignore
          remarkPlugins,
        },
      },
      components,
    });

    return {
      meta: { ...frontmatter, ...additionalProperties },
      content: fileContent,
    };
  } catch (err) {
    //console.log(err);
  }
};

export const getAllData = async () => {
  const promisesArray = config.navigation.map(async ({ group, pages }) => {
    return Promise.all(
      pages.map(async (page) => {
        const mdx = await getMdxMetaDataBySlug(page, { group, filePath: page });
        return mdx;
      })
    );
  });

  const mdxData = await Promise.all(promisesArray);
  const result: DataFinal[] = [
    { tabName: 'Documentation', groups: [], groupsNames: [] },
  ];

  if (configTyped.tabs) {
    configTyped.tabs.forEach((tab) =>
      result.push({
        tabName: tab.name,
        groups: [],
        groupsNames: tab.groups ?? [],
      })
    );
  }

  mdxData.forEach((arr) => {
    arr.forEach(({ meta, content }: any) => {
      let haveATab = false;
      result.forEach((tab) => {
        tab.groupsNames?.forEach((groupName) => {
          if (meta.group === groupName) {
            let group = tab.groups.find((group) => group.name === groupName);

            if (!group) {
              group = {
                name: groupName,
                pages: [],
              };
              tab.groups.push(group);
            }

            group?.pages.push({
              title: meta.title,
              href: meta.filePath,
              group: groupName,
              content: content,
            });
            haveATab = true;
          }
        });
      });
      if (!haveATab) {
        const targetTab = result[0];

        let groupIndex = targetTab.groupsNames.indexOf(meta.group);

        if (groupIndex === -1) {
          targetTab.groupsNames.push(meta.group);
          targetTab.groups.push({
            name: meta.group,
            pages: [],
          });

          groupIndex = targetTab.groupsNames.indexOf(meta.group);
        }

        targetTab.groups[groupIndex].pages.push({
          title: meta.title,
          href: meta.filePath,
          group: meta.group,
          content: content,
        });
      }
    });
  });

  return result;
};

export const getGroupName = (pageName: string) => {
  return config.navigation.find((group) => {
    return group.pages.find((page) => pageName == page);
  })?.group;
};
