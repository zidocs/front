type ResponseFieldProps = {
  name: string;
  type: string;
  children: React.ReactNode;
  required?: boolean;
};

const ResponseField = (props: ResponseFieldProps) => {
  return (
    <div className="mb-6 flex flex-col border-b border-zinc-300 pb-2 text-sm dark:border-zinc-900">
      <div className="flex justify-between font-light tracking-wider">
        <div className="flex gap-2">
          <span className="font-bold text-primary">{props.name}</span>
          <span className="text-black dark:text-white">
            {props.required && 'required'}
          </span>
        </div>
        <span className="text-black dark:text-white">{props.type}</span>
      </div>
      <div className="base-text-color">{props.children}</div>
    </div>
  );
};

export { ResponseField };
export type { ResponseFieldProps };
