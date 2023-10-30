import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataFinal } from './mdx';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { headingRank as rank } from 'hast-util-heading-rank';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseTextColor =
  'text-opacity-70 text-black dark:text-white dark:text-opacity-70';

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function slugify(input: string) {
  return removeEmoji(
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/^\d+/, '')
      .replace(/^[\d-]+/, '')
      .trim()
  );
}

export function countOccur(input: string, array: string[]) {
  let count = 0;

  for (const str of array) {
    let startIndex = 0;
    while (startIndex !== -1) {
      startIndex = str.indexOf(input, startIndex);
      if (startIndex !== -1) {
        count++;
        startIndex += input.length;
      }
    }
  }

  return count;
}

export function getActualPage(data: DataFinal[], pathname: string) {
  return data
    .find((group) =>
      group.groups.some((innerGroup) =>
        innerGroup.pages.some((page) => `/${page.href}` === pathname)
      )
    )
    ?.groups[0].pages.find((page) => `/${page.href}` === pathname);
}

export function getActualTab(data: DataFinal[], pathname: string) {
  return (
    data.find((group) =>
      group.groups.some((innerGroup) =>
        innerGroup.pages.some((page) => `/${page.href}` === pathname)
      )
    ) || data[0]
  );
}

export function removeEmoji(word: string | string[]) {
  let str = word;

  if (!Array.isArray(word)) {
    str = (str as string).split(' ');
  }
  str = (str as string[]).filter(
    (item) => !item.startsWith(':') || !item.endsWith(':')
  );

  str = (str.join(' ') as string).replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');

  return str.trim();
}

// TODO: Pesquisar sobre algoritmos para ajuda na pesquisa complexa
export function complexSearch(text: string, input: string) {
  if (input === '') return '';

  let replacedString = text.replace(/#/g, '');
  replacedString = replacedString.replace(/\n/g, ' ');

  const textSplitted = replacedString.split(' ');

  const inputSplitted = input.toLowerCase().split(' ');
  const indexes = [];

  for (var i = 0; i < inputSplitted.length; i++) {
    const index = replacedString
      .toLowerCase()
      .split(' ')
      .indexOf(inputSplitted[i]);
    if (index !== -1) {
      indexes.push(index);
    }
  }

  if (indexes.length === 0) return '';

  indexes.sort(function (a, b) {
    return a - b;
  });

  const result = [];
  for (var j = 0; j < 10; j++) {
    let index = indexes[0];
    index = index + j;

    if (index >= textSplitted.length) {
      index = index - j * 2;
      result.unshift(textSplitted[index]);
    } else {
      result.push(textSplitted[index]);
    }
  }

  return result.join(' ');
}

interface IHeading {
  depth: number;
  value: string;
  id?: any;
}

export const rehypeNestedHeadings = ({
  headings,
}: {
  headings: IHeading[];
}) => {
  return (tree: any) => {
    visit(tree, 'element', onHeading);

    headings = createTree(headings) || [];
  };

  function onHeading(node: any) {
    const level = rank(node);

    if (level != null) {
      const heading: IHeading = {
        depth: level,
        value: toString(node),
      };
      if (node.properties !== undefined && node.properties.id != null) {
        heading.id = node.properties.id;
      }
      headings.push(heading);
    }
  }

  function createTree(headings: IHeading[]) {
    const root = { depth: 0, children: [] };
    const parents: any = [];
    let previous = root;

    headings.forEach((heading, i, arr) => {
      if (heading.depth > previous.depth) {
        if (previous.children === undefined) {
          previous.children = [];
        }
        parents.push(previous);
      } else if (heading.depth < previous.depth) {
        while (parents[parents.length - 1].depth >= heading.depth) {
          parents.pop();
        }
      }

      parents[parents.length - 1].children.push(heading);
      previous = heading as any;
    });

    return root.children;
  }
};
