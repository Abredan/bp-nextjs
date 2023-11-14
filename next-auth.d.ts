import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { Role, User } from '@prisma/client';

interface SafeUser
  extends Omit<DefaultUser, 'createdAt' | 'updatedAt' | 'hashedPassword' | 'email'> {
  roleId?: string;
  role?: Role;
}

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends SafeUser {}

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    accessToken?: string;
    error?: string;
    user: User;
  }

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}
  /** The OAuth profile returned from your provider */
  interface Profile {}
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends SafeUser {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    accessToken: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
