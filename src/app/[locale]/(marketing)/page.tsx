'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

const HomePage = () => {
  const t = useTranslations('MarketingPage');
  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col max-w-6xl mx-auto items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-5'>
        <h1 className='text-6xl font-bold'>{t('helloWorld')}</h1>
        <p className='w-full sm:w-9/12 text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore necessitatibus
          enim illum adipisci illo aliquam nisi voluptas saepe similique dolore quia voluptatibus
          provident nostrum, error hic accusantium autem recusandae.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
