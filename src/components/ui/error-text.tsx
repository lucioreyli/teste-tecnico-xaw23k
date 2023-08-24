import type { ComponentProps, FC } from 'react';

export const ErrorText: FC<ComponentProps<'p'>> = (props) => (
  <span className="text-sm leading-none text-red-500 mb-2">
    {props.children}
  </span>
);
