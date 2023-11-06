import prismadb from '@/lib/prisma-db';
import { User } from '@prisma/client/edge';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcrypt';

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    updateAge: 24 * 60 * 60, // 24 hours
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  adapter: PrismaAdapter(prismadb),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please check your username and password, and try again.');
        }

        const users: User[] | null = await prismadb.user.findMany({
          where: {
            OR: [{ email: credentials.username }, { name: credentials.username }],
          },
          take: 1,
        });
        const user = users?.length ? users[0] : null;

        const errorMessage = `We were unable to sign you in. If you continue to experience problems, please reset your password or contact support using the "Forgot Password" link`;
        if (!user || !user?.hashedPassword) {
          throw new Error(errorMessage);
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error(errorMessage);
        }
        const { hashedPassword, ...profile } = user;
        return profile as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      
      if (user?.id) {
        token.role = user.role;
        token.picture = user.image;
        // token.accessToken = account.access_token!;
      }
      return await token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: JWT;
      user: AdapterUser;
    }) {
      session.accessToken = token.accessToken;
      session.user.id = token?.sub;
      session.user.role = token.role;
      session.user.image = token.picture;
      
      const stripeEnabled = !!process.env.STRIPE_ENABLED!;
      if (stripeEnabled) {
        const savedUser = await prismadb.user.findFirst({
          where: {
            email: session.email,
          },
          include: {
            customer: true,
          },
        });
        if (savedUser) {
          session.user.accountActive = !!savedUser.customer?.plan;
          session.user.customerId = savedUser.customer?.customerId;
          session.user.customerPlan = savedUser.customer?.plan;
        }
      }
      return await session;
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
};

/*
Gmail:
reconnexion.center@gmail.com
MDP: R3c0nn3x10nC3nt3r$

WebMail
contact@reconnexion-center.fr
R3c0nn3x10nC3nt3r$2023$

MailChimp
reconnexion_center / R3c0nn3x10nC3nt3r$

Youtube:
Reconnexion Center
@Reconnexion-Center

TikTok
Reconnexion.Center
@reconnexion.center
Connexion avec le compte Gmail

Twitter (compte certifié payant)
@ReconnexionC (moins de 15Char)
#ReconnexionCenter
Connexion avec le compte Gmail

Instagram
reconnexion.center@gmail.com
reconnexion.center
MDP: R3c0nn3x10nC3nt3r$


Facebook
contact@reconnexion-center.fr
R3c0nn3x10nC3nt3r$

TYPE	NOM D’HÔTE	VALEUR	SERVICE	ACTIONS
A	@	217.160.0.69	Default Site	
AAAA	@	2001:8d8:100f:f000:0:0:0:200	Default Site	
TXT	_dep_ws_mutex	"7dc685ec07e44427702ca265aa5ca2de183c2a7aedee6407abcca90a08e6bd6b_169918..."	Default Site	
CNAME	_domainconnect	_domainconnect.ionos.com	Domain Connect	
MX	@	mx00.ionos.fr	Mail	
MX	@	mx01.ionos.fr	Mail	
TXT	@	"v=spf1 include:_spf-eu.ionos.com ~all"	Mail	
CNAME	autodiscover	adsredir.ionos.info	Mail	

*/
