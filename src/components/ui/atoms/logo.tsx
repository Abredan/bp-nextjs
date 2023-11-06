'use client';
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  iconOnly?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

const Logo = ({ iconOnly = false, size = 'sm' }: LogoProps) => {
  const trueSize = useMemo(() => {
    switch (size) {
      case 'lg':
        return 80;
      case 'md':
        return 60;
      case 'sm':
        return 30;
      case 'xs':
        return 20;
      default:
        return 30;
    }
  }, [size]);

  return (
    <div className={cn('flex items-center gap-x-0 text-2xl')}>
      <Image
        src={'/icons/logo-dark.svg'}
        height={trueSize}
        width={trueSize}
        className='mx-2 dark:hidden'
        alt='Logo'
      />
      <Image
        src={'/icons/logo-white.svg'}
        height={trueSize}
        width={trueSize}
        className='mx-2 hidden dark:block'
        alt='Logo'
      />
      {!iconOnly && (
        <p
          className={cn(
            'transition-all duration-700 origin-left sm:flex items-center hidden scale-0 sm:scale-100 font-extrabold tracking-tight',
          )}>
          Boilerplate
        </p>
      )}
    </div>
  );
};

export default Logo;
