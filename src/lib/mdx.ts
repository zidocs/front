import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '../components/mdx';
import config from '../../public/zidocs.json';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeNestedHeadings, rehypePreRaw, rehypeRaw } from './utils';
import rehypePrettyCode from 'rehype-pretty-code';
import 'isomorphic-fetch';
import isUrl from 'is-url';
import yaml from 'js-yaml';

export type ZidocsConfig = {
  name: string;
  repoName: string;
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
  openapi?: string;
  api?: {
    baseUrl: string;
    auth: {
      method: string;
    };
  };
};

const configTyped = config;

export const rehypePlugins = [
  rehypeRaw,
  [
    rehypePrettyCode,
    {
      theme: { dark: 'dracula', light: 'light-plus' },
      keepBackground: false,
      defaultLang: 'plaintext',
    },
  ],
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
  rehypePreRaw,
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
  groupName: string;
  openapi?: string;
  additionalProperties?: any;
}

export interface TableOfContent {
  id: string;
  depth: number;
  value: string;
}

export interface DataFromConfig {
  tabName: string;
  groups: GroupFromConfig[];
  groupsNames: string[];
}

export interface GroupFromConfig {
  name: string;
  pages: PageFromConfig[];
}

export interface PageFromConfig {
  title: string;
  href: string;
  toc: TableOfContent[];
  content: string;
  icon?: string;
  group?: string;
}

const FOLDER_PATH = path.join(process.cwd(), 'public');

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
          rehypePlugins: [
            //@ts-ignore
            ...rehypePlugins,
            //@ts-ignore
            [rehypeNestedHeadings, { headings }],
          ],
          remarkPlugins,
        },
      },
      components,
    });

    const groupName = getPageGroupName(slug);
    if (frontmatter.openapi) {
      await getEndpointOpenApiData(frontmatter.openapi as string);
    }

    return {
      meta: {
        ...frontmatter,
        ...additionalProperties,
        toc: headings,
        groupName,
      },
      content,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getAllMdx = async () => {
  const promisesArray = config.navigation.map(async ({ group, pages }) => {
    return Promise.all(
      pages.map(async (page) => {
        const mdx = await getMdxBySlug(page, { group, filePath: page });
        return mdx;
      })
    );
  });

  const mdxData = await Promise.all(promisesArray);
  const result: DataFromConfig[] = [
    { tabName: 'Documentation', groups: [], groupsNames: [] },
  ];

  if (configTyped.tabs) {
    configTyped.tabs.forEach((tab) =>
      result.push({
        tabName: tab.name,
        groups: [],
        groupsNames: tab.groups || [],
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
              toc: meta.toc,
              content: content,
              icon: meta.icon,
              group: groupName,
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
          toc: meta.toc,
          group: meta.group,
          content: content,
        });
      }
    });
  });

  return result;
};

export const getPageGroupName = (pageName: string) => {
  return config.navigation.find((group) => {
    return group.pages.find((page) => pageName == page);
  })?.group;
};

export const getAllPagesSlugList = async () => {
  return config.navigation.flatMap(({ pages }) =>
    pages.map((page) => ({ slug: page.split('/') }))
  );
};

export const getEndpointOpenApiData = async (endpointOpenApi: string) => {
  try {
    let contents;
    const configTyped = config as ZidocsConfig;
    if (configTyped.openapi && isUrl(configTyped.openapi)) {
      // Remote spec
      const response = await fetch(configTyped.openapi);
      contents = await response.text();
    } else {
      // Local spec
      contents = fs.readFileSync(
        `${FOLDER_PATH}/${configTyped.openapi}`,
        'utf8'
      );
    }

    const path = endpointOpenApi
      .split(' ')
      .find((path: string) => path.includes('/'));

    const operadores = ['get', 'post', 'put', 'delete'];

    const operador = endpointOpenApi
      .split(' ')
      .find((word: string) => operadores.includes(word.toLowerCase()));

    const spec: any = await yaml.load(contents);

    if (path && operador) {
      const t = spec.paths[path][operador?.toLowerCase()];
      // console.log(spec.paths[path][operador?.toLowerCase()]);
      // console.log(t.parameters[0].schema);
    }
  } catch (err) {
    console.log(`Unable to get ${endpointOpenApi} in openApi file.`);
  }
};

export const getMdxMetadata = async (slug: string) => {
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

  return frontmatter;
};
