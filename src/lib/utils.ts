import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataFinal } from './mdx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseColor =
  'text-opacity-70 text-black dark:text-white dark:text-opacity-70';

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^\d+/, '')
    .replace(/^[\d-]+/, '');
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
