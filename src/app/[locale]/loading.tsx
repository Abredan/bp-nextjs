'use client';
import Spinner from '@/components/ui/atoms/spinner';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center'>
      <Spinner size={'lg'} />
    </div>
  );
};

export default Loading;
