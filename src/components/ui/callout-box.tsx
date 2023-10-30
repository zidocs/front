import { baseTextColor, cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { Icon, IconProps } from './icon';

interface CalloutBoxProps {
  children: ReactNode;
  className?: string;
}

const CalloutBox = (props: CalloutBoxProps) => {
  return (
    <div
      className={cn(
        'mb-4 flex w-full items-center gap-3 rounded-xl border-[0.1px] bg-opacity-5 p-4 px-4 text-sm dark:bg-opacity-20',
        baseTextColor,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

const CalloutBoxIcon = (props: {
  name: IconProps['name'];
  className?: string;
}) => {
  return <Icon {...props} size={20} strokeWidth="2.5" />;
};

const Note = (props: CalloutBoxProps) => {
  return (
    <CalloutBox className="border-sky-200 bg-sky-200 dark:border-sky-700 dark:bg-sky-900 dark:text-sky-200">
      <CalloutBoxIcon name="alertCircle" className="text-sky-400" />
      {props.children}
    </CalloutBox>
  );
};

const Warning = (props: CalloutBoxProps) => {
  return (
    <CalloutBox className="border-yellow-200 bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
      <CalloutBoxIcon name="alertTriangle" className="text-yellow-400" />
      {props.children}
    </CalloutBox>
  );
};

const Info = (props: CalloutBoxProps) => {
  return (
    <CalloutBox className="border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
      <CalloutBoxIcon name="info" className="text-gray-400" />
      {props.children}
    </CalloutBox>
  );
};

const Tip = (props: CalloutBoxProps) => {
  return (
    <CalloutBox className="border-emerald-200 bg-emerald-200 dark:border-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
      <CalloutBoxIcon name="lightBulb" className="text-emerald-400" />
      {props.children}
    </CalloutBox>
  );
};

const Check = (props: CalloutBoxProps) => {
  return (
    <CalloutBox className="border-emerald-200 bg-emerald-200 dark:border-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
      <CalloutBoxIcon name="check" className="text-emerald-400" />
      {props.children}
    </CalloutBox>
  );
};

export { Note, Warning, Info, Tip, Check };
export type { CalloutBoxProps };
