import { Github, TerminalSquare } from 'lucide-react';

interface IconProps {
  name: 'github' | 'terminalSquare';
  className?: string;
  size?: string;
  color?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const Icons: Record<IconProps['name'], any> = {
    github: <Github {...props} />,
    terminalSquare: <TerminalSquare {...props} />,
  };

  return Icons[name];
};

export { Icon };
