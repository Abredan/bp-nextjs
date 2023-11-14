import { PASSWORD_REGEX } from '@/lib/constants';
import { CustomNextResponse } from '@/lib/helpers';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from 'next-auth';
import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import prismadb from '@/lib/prisma-db';

const PostCreateUserParams = z
  .object({
    email: z.string().email({
      message: 'Email is invalid. Format: jack.sparrow@inbox.fr.',
    }),
    name: z
      .string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string.',
      })
      .min(3, { message: 'Name is too short. Min: 3 Characters' }),
    password: z
      .string({
        required_error: 'Password is required.',
        invalid_type_error: 'Password must be a string.',
      })
      .min(6, { message: 'Password is too short. Min: 6 Characters' })
      .regex(PASSWORD_REGEX, { message: 'Password not match policy.' }),
    get_updated: z.boolean().optional(),
  })
  .strict();

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log(body);
  
  const validate = PostCreateUserParams.safeParse(body);

  if (!validate.success) {
    return CustomNextResponse.error({
      errors: validate.error.issues,
      message: 'Bad params',
    });
  }

  try {
    const { email, name, password } = body;
    const accountExists = await prismadb.user.findMany({
      where: { email },
    });
    if (accountExists && Array.isArray(accountExists) && accountExists.length > 0) {
      return CustomNextResponse.error(
        {
          errors: [
            {
              code: 'custom',
              message: 'user_already_exists',
            },
          ],
          message: 'You are already registrated, please go to sign in.',
        },
        409,
      );
    }

    const defaultRole = await prismadb.role.findUnique({
      where: { displayName: 'Basic' },
    });
    if (!defaultRole) {
      return CustomNextResponse.raise(`No User Role for you. Please contact Support or Admin.`);
    }

    const stripeEnabled = !!process.env.STRIPE_ENABLED!;
    const hashedPassw = await bcrypt.hash(password, 12);
    const newAccount = await prismadb.user.create({
      data: {
        email,
        name,
        roleId: defaultRole.id,
        hashedPassword: hashedPassw,
        accountActive: !stripeEnabled,
        image: `https://ui-avatars.com/api/?name=${name}`,
      },
    });

    // const { hashedPassword, ...accountSecured } = newAccount;
    await createUserAccount(newAccount);
    if (stripeEnabled) {
      await createStripeCustomer(email);
    }
    return CustomNextResponse.success({}, 201);
  } catch (error) {
    console.error(error);
    return CustomNextResponse.error(
      {
        errors: [{ code: 'custom', message: 'user_creation' }],
        message: `Something went wrong.`,
      },
      500,
    );
  }
};

const createUserAccount = async (user: User) => {
  return await prismadb.account.create({
    data: {
      userId: user.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: user.id,
    },
  });
};

const createStripeCustomer = async (email: string) => {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
  const stripe = new Stripe(`${STRIPE_SECRET_KEY}`, {
    apiVersion: '2023-10-16',
  });

  // Create a stripe customer for the user with their email address
  return await stripe.customers
    .create({ email })
    .then(async (customer: Stripe.Response<Stripe.Customer>) => {
      return await prismadb.user.update({
        where: { email },
        data: {
          customer: {
            create: {
              customerId: customer.id,
            },
          },
        },
      });
    });
};
