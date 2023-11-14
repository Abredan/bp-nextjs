'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Spinner from '@/components/ui/atoms/spinner';

const PageLoading = () => {
  return (
    <div className='flex flex-col space-y-4 w-full py-10 justify-center items-center'>
      <Spinner size={'lg'} />
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className='text-sm text-gray-600'>
        Summoning the digital storks to deliver features...
      </motion.p>
      <div
        role='status'
        className='animate-pulse flex flex-col min-w-[200px] space-y-2'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='h-2 w-full bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mx-auto'></motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='h-2 w-8/12 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]'></motion.div>
      </div>
    </div>
  );
};

export default PageLoading;
