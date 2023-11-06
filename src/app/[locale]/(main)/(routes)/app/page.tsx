'use client';
import { signOut, useSession } from 'next-auth/react';
import { RedirectType, redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const HomePageMain = () => {
  const {status} = useSession()

  useEffect(()=>{
    if(status === 'unauthenticated') {
      redirect('/auth/login', RedirectType.replace);
    }
  }, [status])

  return (
    <div className='flex flex-col w-full px-6 sm:px-16 min-h-full h-full overflow-hidden'>
      <div className='flex flex-row items-center space-x-4'>
        <div>Private Section</div>
        <button onClick={() => signOut({redirect: false})} className={'border-2 px-3 py-1'}>Sign out</button>
      </div>
    </div>
  );
};

export default HomePageMain;
