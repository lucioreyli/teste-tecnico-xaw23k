import { NavBar } from '@/components/NavBar';
import type { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
);

export default Layout;
