import type { ComponentProps, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ComponentProps<'div'>>;

export const TextCell: FC<Props> = ({ children }) => <p>{children}</p>;
