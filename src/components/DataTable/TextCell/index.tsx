import type { FC, PropsWithChildren } from 'react';

export const TextCell: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex space-x-2">
    <span className="capitalize">{children}</span>
  </div>
);
