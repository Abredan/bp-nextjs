'use client';
import React from 'react';
import Logo from '../../../../components/ui/atoms/logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { LOCALES } from '@/i18n';

const Footer = () => {
  const locale = useLocale();

  return (
    <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center w-full p-6 bg-background z-50 max-w-6xl mx-auto'>
      <Logo iconOnly={true} />
      <div
        className='md:ml-auto w-full justify-between md:justify-end 
        flex flex-col sm:flex-row items-center gap-x-4 text-muted-foreground'>
        <Link
          href={'/privacy-policy'}
          className='text-sm py-1'>
          Privacy policy
        </Link>
        <Link
          href={'/terms-of-use'}
          className='text-sm py-1'>
          Terms & Conditions
        </Link>
        <div className='flex flex-row items-center space-x-2'>
          {LOCALES.map((l, index) => (
            <Link
              key={'l' + index}
              className={cn('text-gray-500 text-sm py-1', locale == l ? 'border-b-2' : '')}
              href={`/${l}`}
              locale={l}>
              {l.toLowerCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
