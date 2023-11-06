'use client';
import React, { Suspense, useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from '../../../../components/ui/atoms/logo';
import { MenuIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useScrollTop } from '@/hooks/ui/use-scroll-top';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/ui/atoms/spinner';

const MARKETING_LINKS: { url: string; title: string }[] = [
  { title: 'About', url: '/#about-us' },
  { title: 'Features', url: '/#features' },
  { title: 'Pricing', url: '/#pricing' },
  { title: 'Contact us', url: '/#contact-us' },
];

const Navbar = () => {
  const scrolled = useScrollTop();
  const [visible, setVisible] = useState(true);
  const { status } = useSession();
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
        <div className={cn('hidden md:flex justify-center items-center w-4/12')}>
          <ul className='flex flex-row space-x-10 items-center text-sm'>
            {MARKETING_LINKS.slice(0, 3).map((l, index) => (
              <li key={`menu-` + index}>
                <Link href={l.url}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-9/12 flex space-x-3 md:w-4/12 justify-end items-center'>
          {status === 'loading' && <Spinner />}
          {status === 'unauthenticated' ? (
            <>
              <Link
                href={'/auth/login'}
                className='hidden sm:flex'>
                Login
              </Link>
              <Link
                href={'/auth/register'}
                className='hidden sm:flex'>
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}/app`}
                locale={locale}>
                Go to app
              </Link>{' '}
            </>
          )}
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
      </div>
      <div
        className={cn(
          visible ? 'h-auto pb-6' : 'h-0 py-0',
          'transition-all duration-400',
          'flex flex-col space-y-4 w-full px-6 bg-white dark:bg-black shadow-lg md:hidden overflow-hidden',
        )}>
        <ul className='flex w-full flex-col space-y-2 justify-items-center'>
          {MARKETING_LINKS.map((l) => (
            <li
              key={l.url}
              className='py-2 px-2 hover:bg-primary/10 hover:text-white 
                        w-full cursor-pointer transition-all duration-400 rounded-sm'>
              <Link href={l.url}>{l.title}</Link>
            </li>
          ))}
        </ul>
        <div className='flex sm:hidden flex-row space-x-3 w-full'>
          <Link
            href={'/auth/login'}
            className='w-full'>
            Login
          </Link>
          <Link
            href={'/auth/register'}
            className='w-full'>
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
