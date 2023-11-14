'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/app/[locale]/(main)/_components/heading';
import { FolderLockIcon, SettingsIcon, Wallet2Icon } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className='flex flex-col w-full px-6 sm:px-16 min-h-full h-full overflow-hidden'>
      <div className='flex flex-col items-start space-y-4'>
        <Heading
          category='Settings'
          title='Configure your application'>
          <button className={'border-2 p-3 rounded-full flex flex-col justify-center items-center'}>
            <SettingsIcon className={`h-6 w-6`} />
          </button>
        </Heading>
      </div>
      <div className='flex flex-col space-y-4 mt-5'>
        <div className='grid grid-cols-6 gap-x-4'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='flex flex-col cursor-pointer justify-center items-center space-y-2 p-5 rounded-md bg-gray-50'>
            <FolderLockIcon className={`h-10 w-10`} />
            <h3 className='text-sm text-center leading-tight'>Roles and permissions</h3>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='flex flex-col cursor-pointer justify-center items-center space-y-2 p-5 rounded-md bg-gray-50'>
            <Wallet2Icon className={`h-10 w-10`} />
            <h3 className='text-sm text-center leading-tight'>Stripe Configuration</h3>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
