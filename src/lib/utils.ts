import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
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