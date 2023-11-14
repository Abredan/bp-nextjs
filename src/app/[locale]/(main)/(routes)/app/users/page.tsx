'use client';
import { useTransition } from 'react';
import Heading from '@/app/[locale]/(main)/_components/heading';
import { FolderLockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetUsersQuery } from '@/store/apis/users.api';
import { userColumns } from './_components/user-columns';
import Spinner from '@/components/ui/atoms/spinner';
import dynamic from 'next/dynamic';

const LazyDatatable = dynamic(
  () => import('@/components/ui/data-table').then((mod) => mod.DataTable),
  {
    ssr: false,
  },
);

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  return (
    <div className='flex flex-col w-full px-6 sm:px-16 min-h-full h-full overflow-hidden'>
      <div className='flex flex-col items-start space-y-4'>
        <Heading
          category='Users'
          title='Manage account and password'>
          <div className='flex flex-row space-x-4 items-center'>
            <Button variant={'default'}>Create user</Button>
            <button
              className={'border-2 p-3 rounded-full flex flex-col justify-center items-center'}>
              <FolderLockIcon className={`h-6 w-6`} />
            </button>
          </div>
        </Heading>
      </div>

      <div className='flex flex-col space-y-4 mt-5'>
        {isLoading && (
          <div className='flex flex-col h-48 justify-center items-center'>
            <Spinner size={'lg'} />
          </div>
        )}

        {!isLoading && users && (
          <LazyDatatable
            data={users}
            columns={userColumns}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
