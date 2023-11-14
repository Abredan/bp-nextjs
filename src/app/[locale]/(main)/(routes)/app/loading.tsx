'use client';
import React from 'react';
import PageLoading from '@/components/ui/layouts/page-loading';

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[80vh] w-full'>
      <PageLoading />
    </div>
  );
};

export default Loading;
