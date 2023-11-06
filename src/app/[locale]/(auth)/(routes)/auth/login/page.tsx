'use client';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageTransition from '@/components/ui/layouts/page-transition';
import { toast } from 'sonner';
import Spinner from '@/components/ui/atoms/spinner';
import { signIn, useSession } from 'next-auth/react';
import { RedirectType, redirect } from 'next/navigation';
import { LoginFormInputs, TLoginInputs } from '@/store/apis/auth.api';
import { useAppDispatch } from '@/store/store';
import { useGetRolesQuery } from '@/store/apis/role.api';

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<TLoginInputs>({
    resolver: zodResolver(LoginFormInputs),
    defaultValues: {
      username: 'alainabredan',
      password: 'Abr3d@n$j3sus',
    },
  });
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  // const {data} = useGetRolesQuery('Roles');

  const onSubmit: SubmitHandler<TLoginInputs> = useCallback(async (data) => {
    signIn('credentials', { ...data, redirect: false })
      .then((payload) => {
        if (!payload?.error) {
          toast.success(`Welcome back! Please wait...`);
        } else {
          toast.error(payload.error);
        }
      })
      .catch((error) => toast.error('Something went wrong! Please retry.'));
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/app', RedirectType.replace);
    }
  }, [dispatch, status, session?.user]);

  return (
    <PageTransition>
      <div className='min-h-full flex flex-col'>
        <div className='flex flex-col max-w-6xl mx-auto items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-5 bg-red-100'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-row w-full space-x-4'>
            <div className='flex flex-col space-y-2'>
              <input
                {...register('username')}
                type='text'
                placeholder='Username'
                autoComplete='autocomplete'
              />
              {errors.username?.message && <p className='text-xs'>{errors.username?.message}</p>}
            </div>
            <div className='flex flex-col space-y-2'>
              <input
                {...register('password')}
                type='password'
                placeholder='Password'
              />
              {errors.password?.message && <p className='text-xs'>{errors.password?.message}</p>}
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <button disabled={isLoading}>Sign in</button>
              {isLoading && <Spinner />}
            </div>
          </form>
          <Link href={'/auth/register'}>{`Don't have an account yet? Register`}</Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
