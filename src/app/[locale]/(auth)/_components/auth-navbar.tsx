'use client';
import React, { useState } from 'react';
import { MenuIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useScrollTop } from '@/hooks/ui/use-scroll-top';
import Logo from '@/components/ui/atoms/logo';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/ui/atoms/spinner';

const AuthNavbar = () => {
  const scrolled = useScrollTop();
  const [visible, setVisible] = useState(false);
  const { data: session, status } = useSession();
  const locale = useLocale();

  return (
    <header
      className={cn(
        'z-50 fixed top-0 flex flex-col space-y-2 items-center w-full py-4 transition-all',
        scrolled && 'bg-white dark:bg-background dark:border-none',
      )}>
      <div className='max-w-6xl flex justify-between px-6 mx-auto w-full items-center'>
        <div className='w-3/12 md:w-4/12 flex justify-start'>
          <Link href={`/${locale}`}>
            <Logo />
          </Link>
        </div>
        {status === 'loading' && <Spinner />}
        {status === 'unauthenticated' && (
          <div className='flex-1 flex space-x-4 justify-end items-center'>
            <>
              <Link
                href={'/auth/login'}
                className='hidden sm:flex'>
                Login
              </Link>
              <Link
                href={'/auth/register'}
                className='hidden sm:flex'>
                Register
              </Link>
            </>
            <div className='hidden md:flex'>{/* <ThemeToggle /> */}</div>
            <button
              className='flex md:hidden'
              onClick={() => setVisible(!visible)}>
              {visible ? (
                <XCircleIcon className='transition-all w-6 h-6 bg-gray -mx-4' />
              ) : (
                <MenuIcon className='transition-all w-6 h-6 bg-gray -mx-4' />
              )}
            </button>
          </div>
        )}
      </div>
      <div
        className={cn(
          visible ? 'h-auto pb-6' : 'h-0 py-0',
          'transition-all duration-400',
          'flex flex-col space-y-4 w-full px-6 bg-white dark:bg-black shadow-lg md:hidden overflow-hidden',
        )}>
        <div className='flex sm:hidden flex-col space-y-4 gap-y-2 w-full'>
          <Link
            href={'/auth/login'}
            className='w-full text-center'>
            Login
          </Link>
          <Link
            href={'/auth/register'}
            className='w-full text-center'>
            Create new account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
