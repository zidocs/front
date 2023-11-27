import React from 'react';
import { ReactElement } from 'react';

interface StepsProps {
  children: ReactElement<StepProps>[];
  titleSize?: string;
}

interface StepProps {
  children: string | React.ReactNode;
  icon?: string;
  iconType?: string;
  title?: string;
  stepNumber?: number;
  titleSize?: string;
}

const Step = ({ children, title, stepNumber }: StepProps) => {
  return (
    <div className="relative flex items-start pb-2" role="listitem">
      <div className="absolute top-[2.75rem] h-[calc(100%-2.75rem)] w-px bg-gray-200/70 dark:bg-white/10"></div>
      <div className="absolute ml-[-14px] py-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-800 dark:bg-[#26292E] dark:text-white">
          {stepNumber}
        </div>
      </div>

      <div className="w-full overflow-hidden pl-12 pr-px">
        {title && (
          <p className="prose mt-2 font-semibold tracking-wide text-gray-900 dark:prose-invert dark:text-gray-200">
            {title}
          </p>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

Step.displayName = 'Step';

const Steps = ({ children }: StepsProps) => {
  const orderedSteps = children.map((child) => {
    if (typeof child.type !== 'string' && child.type?.name === 'Step') {
      const newStep = React.cloneElement(child, {
        stepNumber: children.indexOf(child) + 1,
      });
      return newStep;
    }
    return child;
  });

  return (
    <div className="mb-6 ml-3.5 mt-10" role="list">
      {orderedSteps}
    </div>
  );
};

Step.displayName = 'Step';

export { Step, Steps };
