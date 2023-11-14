import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import ToasterProvider from '@/components/providers/toaster-provider';
import ReduxProvider from '@/components/providers/redux-provider';
import AuthProvider from '@/components/providers/auth-provider';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/auth';
import { LOCALES } from '@/i18n';
import './global.css';

export const metadata: Metadata = {
  title: 'Ready to accelerate',
  description: 'Hello world',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons/logo-dark.svg',
        href: '/icons/logo-dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons/logo-white.svg',
        href: '/icons/logo-white.svg',
      },
    ],
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(nextAuthOptions);

  let messages;
  try {
    messages = (await import(`@/../../locales/${locale}.json`)).default;
  } catch (error) {
    return notFound();
  }

  return (
    <html
      lang={locale}
      data-theme={`bumblebee`}>
      <body>
        <ReduxProvider>
          <AuthProvider session={session}>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}>
              <ToasterProvider />
              {children}
            </NextIntlClientProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
