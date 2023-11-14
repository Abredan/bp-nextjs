'use client';
import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import PageTransition from '@/components/ui/layouts/page-transition';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { RedirectType, redirect } from 'next/navigation';
import { useRegisterMutation } from '@/store/apis/auth.api';
import Spinner from '@/components/ui/atoms/spinner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const registerFormInputs = z.object({
  name: z.string().min(5, { message: 'Username length not correct' }),
  email: z.string().email({ message: 'Email bad format. Please fix it!' }),
  password: z.string().min(4, { message: 'Password length not correct' }),
});
export type TRegisterInputs = z.infer<typeof registerFormInputs>;

const RegisterPage = () => {
  const form = useForm<TRegisterInputs>({
    resolver: zodResolver(registerFormInputs),
    defaultValues: {
      name: 'alainabredan',
      password: 'Abr3d@n$j3sus',
      email: 'alainabredan@gmail.com',
    },
  });
  const { status } = useSession();
  const [createUser, { isLoading, isSuccess }] = useRegisterMutation();

  const registerNewUser = async (data: TRegisterInputs) =>
    await createUser(data)
      .unwrap()
      .then(async (payload) => {
        if (isSuccess) {
          const { password, name } = data;
          toast.success(`🎉 Congratulations!`, {
            description: `Your account has been baked to perfection. Welcome to the family!`,
            duration: 10000,
          });
          await signIn('credentials', { username: name, password, redirect: false });
        }
      });

  const onSubmit: SubmitHandler<TRegisterInputs> = async (data) => {
    toast.promise(registerNewUser(data), {
      loading: `This won't take long... unless you're counting in microseconds, then it might take a few million!`,
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
        <div
          className='flex flex-col max-w-6xl mx-auto items-center justify-center
        md:justify-start text-center gap-y-8 flex-1 px-8 py-10 bg-gray-50 rounded-md w-[400px]'>
          {form.formState.isLoading ? (
            <Spinner />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={'flex flex-col w-full space-y-4'}>
                <FormField
                  name={'name'}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={'Username'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={'text-left text-sm'} />
                    </FormItem>
                  )}
                />
                <FormField
                  name={'email'}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={'email'}
                          type={'email'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={'text-left text-sm'} />
                    </FormItem>
                  )}
                />
                <FormField
                  name={'password'}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={'password'}
                          type={'password'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={'text-left text-sm'} />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className={'w-full'}>
                  Join community
                </Button>
              </form>
            </Form>
          )}
          <Link
            href={'/auth/login'}
            className={`text-sm`}>{`Already have an account? Sign in`}</Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;
