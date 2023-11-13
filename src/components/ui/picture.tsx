'use client';

import { cn } from '@/lib/utils';
import {
  StaticImport,
  PlaceholderValue,
  OnLoadingComplete,
} from 'next/dist/shared/lib/get-img-props';
import Image, { ImageLoader } from 'next/image';
import {
  JSX,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  RefAttributes,
} from 'react';
import 'react-medium-image-zoom/dist/styles.css';

const Picture = (
  props: JSX.IntrinsicAttributes &
    Omit<
      DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
    > & {
      src: string | StaticImport;
      alt: string;
      width?: number | `${number}` | undefined;
      height?: number | `${number}` | undefined;
      fill?: boolean | undefined;
      loader?: ImageLoader | undefined;
      quality?: number | `${number}` | undefined;
      priority?: boolean | undefined;
      loading?: 'eager' | 'lazy' | undefined;
      placeholder?: PlaceholderValue | undefined;
      blurDataURL?: string | undefined;
      unoptimized?: boolean | undefined;
      onLoadingComplete?: OnLoadingComplete | undefined;
      layout?: string | undefined;
      objectFit?: string | undefined;
      objectPosition?: string | undefined;
      lazyBoundary?: string | undefined;
      lazyRoot?: string | undefined;
    } & RefAttributes<HTMLImageElement>
) => {
  return (
    <Image
      width={700}
      height={475}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
      {...props}
      className={cn('rounded-3xl', props.className)}
    />
  );
};

export { Picture };
