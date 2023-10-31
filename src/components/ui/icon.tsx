import {
  AlertCircle,
  AlertTriangle,
  Check,
  Github,
  Info,
  Lightbulb,
  TerminalSquare,
  BookOpen,
} from 'lucide-react';

interface IconProps {
  name:
    | 'github'
    | 'terminalSquare'
    | 'alertCircle'
    | 'alertTriangle'
    | 'info'
    | 'lightBulb'
    | 'check'
    | 'bookOpen';
  className?: string;
  size?: string | number;
  strokeWidth?: string | number;
  color?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const Icons: Record<IconProps['name'], any> = {
    github: <Github {...props} />,
    terminalSquare: <TerminalSquare {...props} />,
    alertCircle: <AlertCircle {...props} />,
    alertTriangle: <AlertTriangle {...props} />,
    info: <Info {...props} />,
    lightBulb: <Lightbulb {...props} />,
    check: <Check {...props} />,
    bookOpen: <BookOpen {...props} />,
  };

  return Icons[name];
};

export { Icon };
export type { IconProps };
