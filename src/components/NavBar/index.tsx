'use client';
import { useState, type FC, type PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../ui/button';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

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
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  const pathName = usePathname();
  const isRoot = !pathName.includes('register');

  return (
    <div
      data-visible={showMenu}
      className={cn(
        'px-6 pt-12 md:w-1/6 md:sticky md:top-[0px] md:self-start',
        'flex flex-col gap-5 bg-white dark:bg-black z-50',
        'max-md:data-[visible=true]:w-full',
        'max-md:data-[visible=true]:absolute',
        'max-md:data-[visible=true]:h-[100dvh]',
      )}
    >
      <div className="flex w-fit mb-6 items-center gap-4">
        <Button className="md:hidden" onClick={toggleMenu}>
          {showMenu ? <X width="w-4" /> : <Menu width="w-4" />}
        </Button>
        <h3>Navegação</h3>
      </div>
      <div
        data-visible={showMenu}
        className={cn('flex flex-col', 'max-md:data-[visible=false]:hidden')}
      >
        <NavItem variant={isRoot ? 'secondary' : 'link'} href="/">
          Listagem
        </NavItem>
        <NavItem variant={!isRoot ? 'secondary' : 'link'} href="register">
          Cadastrar
        </NavItem>
      </div>
    </div>
  );
};
