'use client';
import { signOut, useSession } from 'next-auth/react';
import { RedirectType, redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Heading from '../../_components/heading';
import PageLoading from '@/components/ui/layouts/page-loading';

const HomePageMain = () => {
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login', RedirectType.replace);
    }
  }, [status]);

  return (
    <div className='flex flex-col w-full px-6 sm:px-16 min-h-full h-full overflow-hidden'>
      <div className='flex flex-col items-start space-y-4'>
        <Heading
          category='Dashboard'
          title='Welcome back'>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className={'btn btn-primary'}>
            Sign out
          </button>
        </Heading>
      </div>
      <div className='overflow-y-auto'>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HomePageMain;
