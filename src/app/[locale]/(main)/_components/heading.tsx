'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';

interface HeadingProps {
  category?: string;
  title: string;
  children?: React.ReactNode;
  goBack?: boolean;
}

const Heading = ({ children, title, category, goBack }: HeadingProps) => {
  return (
    <div className='flex flex-row w-full items-center justify-between py-3'>
      <div className='flex flex-row flex-1 space-x-4'>
        {goBack && (
          <button className='flex justify-center items-center rounded-full p-3 mr-2 w-12 h-12 bg-gray-50'>
            <ArrowLeftIcon className='w-8 h-8 text-foreground' />
          </button>
        )}
        <div className='flex flex-col flex-1 leading-tight -space-y-1'>
          <span className='text-sm text-muted-foreground'>{category}</span>
          <motion.h1
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='text-3xl font-bold m-0'>
            {title}
          </motion.h1>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Heading;
