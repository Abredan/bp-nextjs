import React from 'react';
import Heading from '@/app/[locale]/(main)/_components/heading';
import { SearchIcon } from 'lucide-react';

const HelpPage = () => {
  return (
    <div className='flex flex-col w-full px-6 sm:px-16 min-h-full h-full overflow-hidden'>
      <div className='flex flex-col items-start space-y-4'>
        <Heading
          category='Help'
          title='Get easy tutorial here'>
          <button className={'border-2 p-3 rounded-full flex flex-col justify-center items-center'}>
            <SearchIcon className={`h-6 w-6`} />
          </button>
        </Heading>
      </div>
    </div>
  );
};

export default HelpPage;
