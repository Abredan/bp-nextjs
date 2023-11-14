import React from 'react';
import { nextAuthOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { RedirectType, redirect } from 'next/navigation';
import { UserSidebar } from './_components/sidebar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/auth/login', RedirectType.replace);
  }

  return (
    <div className='h-screen flex'>
      {/* <aside className='bg-gray-200 w-60 h-full flex flex-col justify-between'></aside> */}
      <UserSidebar />
      <main className='flex-1 flex flex-col'>{children}</main>
    </div>
  );
};

export default MainLayout;
