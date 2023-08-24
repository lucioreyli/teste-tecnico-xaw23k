'use client';
import { type FC, type PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../ui/button';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = { variant: ButtonProps['variant'] } & LinkProps;

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  children,
  variant,
  ...props
}) => (
  <Button asChild variant={variant} className="flex w-full">
    <Link {...props}>{children}</Link>
  </Button>
);

export const NavBar: FC = () => {
  const pathName = usePathname();
  const isRoot = !pathName.includes('register');

  return (
    <div className="px-6 pt-12 w-1/6 md:sticky top-[0px] self-start">
      <span className="mb-6 flex">Navegação</span>
      <NavItem variant={isRoot ? 'secondary' : 'link'} href="/">
        Listagem
      </NavItem>
      <NavItem variant={!isRoot ? 'secondary' : 'link'} href="register">
        Cadastrar
      </NavItem>
    </div>
  );
};
