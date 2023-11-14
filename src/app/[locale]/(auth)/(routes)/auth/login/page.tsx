'use client';
import React, { useCallback, useEffect } from 'react';
import PageTransition from '@/components/ui/layouts/page-transition';
import { LoginFormInputs, TLoginInputs } from '@/store/apis/auth.api';
import PageLoading from '@/components/ui/layouts/page-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RedirectType, redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useAppDispatch } from '@/store/store';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const form = useForm<TLoginInputs>({
    resolver: zodResolver(LoginFormInputs),
    defaultValues: {
      username: 'alainabredan',
      password: 'Abr3d@n$j3sus',
    },
  });
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TLoginInputs> = useCallback(async (data) => {
    toast.promise(signIn('credentials', { ...data, redirect: false }), {
      loading: `Checking your credentials. Please wait...`,
      error: 'Something went wrong! Please retry.',
    });
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      console.log(status);
      redirect('/app', RedirectType.replace);
    }
  }, [dispatch, status, session?.user]);

  if (status === 'loading') {
    return <PageLoading />;
  }

  return (
    <PageTransition>
      <div className='min-h-full flex flex-col'>
        <div
          className='flex flex-col max-w-6xl mx-auto items-center justify-center
                    md:justify-start text-center gap-y-8 flex-1 px-8 py-10 bg-gray-50 rounded-md w-[400px]'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'flex flex-col w-full space-y-4'}>
              <FormField
                control={form.control}
                name={'username'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={'Username'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={'Password'}
                        {...field}
                        type={'password'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className={'w-full'}>
                Login
              </Button>
            </form>
          </Form>
          <Link
            href={'/auth/register'}
            className={`text-sm`}>{`Don't have an account yet? Register`}</Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
