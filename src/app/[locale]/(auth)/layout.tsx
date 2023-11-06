'use client';
import React from 'react';
import AuthNavbar from './_components/auth-navbar';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen h-full'>
      <AuthNavbar />
      <main className='h-full overflow-x-hidden w-full pt-60 min-h-screen'>{children}</main>
    </div>
  );
};

export default MarketingLayout;
