'use client';
import React, { useCallback, useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import PageTransition from '@/components/ui/layouts/page-transition';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { RedirectType, redirect } from 'next/navigation';
import { useRegisterMutation } from '@/store/apis/auth.api';
import { SerializedError } from '@reduxjs/toolkit';

const registerFormInputs = z.object({
  name: z.string().min(5, { message: 'Username length not correct' }),
  email: z.string().email({ message: 'Email bad format. Please fix it!' }),
  password: z.string().min(4, { message: 'Password length not correct' }),
});
export type TRegisterInputs = z.infer<typeof registerFormInputs>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterInputs>({
    resolver: zodResolver(registerFormInputs),
    defaultValues: {
      name: 'alainabredan',
      password: 'Abr3d@n$j3sus',
      email: 'alainabredan@gmail.com',
    },
  });
  const { status } = useSession();
  const [createUser, { isLoading, isSuccess }] = useRegisterMutation();

  const onSubmit: SubmitHandler<TRegisterInputs> = async (data) => {
    await createUser(data)
      .unwrap()
      .then(async (payload) => {
        if (isSuccess) {
          const { password, name } = data;
          toast.success(`Welcome to our community. Please wait...`);
          await signIn('credentials', { username: name, password, redirect: false });
        }
      });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/app', RedirectType.replace);
    }
  }, [status]);

  return (
    <PageTransition>
      <div className='min-h-full flex flex-col'>
        <div className='flex flex-col max-w-6xl mx-auto items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-5 bg-red-100'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-row w-full space-x-4'>
            <div className='flex flex-col space-y-2'>
              <input
                {...register('name')}
                type='text'
                placeholder='Username'
                autoComplete='autocomplete'
              />
              {errors.name?.message && <p className='text-xs'>{errors.name?.message}</p>}
            </div>
            <div className='flex flex-col space-y-2'>
              <input
                {...register('email')}
                type='email'
                placeholder='email'
                autoComplete='autocomplete'
              />
              {errors.email?.message && <p className='text-xs'>{errors.email?.message}</p>}
            </div>
            <div className='flex flex-col space-y-2'>
              <input
                {...register('password')}
                type='password'
                placeholder='Password'
              />
              {errors.password?.message && <p className='text-xs'>{errors.password?.message}</p>}
            </div>
            <button disabled={isLoading}>Join community</button>
          </form>
          <Link href={'/auth/login'}>{`Already have an account? Sign in`}</Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;
