import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

type IconType = keyof typeof dynamicIconImports;

const Icon = ({ name, ...props }: IconProps) => {
  try {
    const LucideIcon = dynamic(dynamicIconImports[name]);

    return <LucideIcon {...props} />;
  } catch (err) {
    console.error('Error while trying to get the icon');
  }
};

export { Icon };
export type { IconType };
