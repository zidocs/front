'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconName,
  SizeProp,
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

export type IconProps = {
  name: IconName | string;
  size?: SizeProp | undefined;
  className?: string;
  onClick?: () => void;
};

export function Icon({ name, className, ...rest }: IconProps) {
  try {
    const brand = findIconDefinition({
      prefix: 'fab',
      iconName: name as IconName,
    });

    if (brand) {
      return (
        <span className={className}>
          <FontAwesomeIcon icon={['fab', name as IconName]} {...rest} />
        </span>
      );
    }

    const regular = findIconDefinition({
      prefix: 'far',
      iconName: name as IconName,
    });

    if (regular && !['sun', 'moon'].includes(name)) {
      return (
        <span className={className}>
          <FontAwesomeIcon icon={['far', name as IconName]} {...rest} />
        </span>
      );
    }

    return (
      <span className={className}>
        <FontAwesomeIcon icon={['fas', name as IconName]} {...rest} />
      </span>
    );
  } catch (err) {
    console.log('Error while trying to get icon');
  }
}
