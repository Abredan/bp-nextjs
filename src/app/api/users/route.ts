import { NextRequest } from 'next/server';
import { CustomNextResponse } from '@/lib/helpers';
import prismadb from '@/lib/prisma-db';
import type { User } from '@prisma/client';
import { createUserSchema } from '@/dto/users.dto';
import { prismaExclude } from '@/lib/utils';
import { z } from 'zod';


export const GET = async () => {
  const users: User[] = await prismadb.user.findMany({ include: { role: true } });
  const safeUsers = users.map((u) => {
    const { hashedPassword, ...safe } = u;
    return safe;
  });
  return CustomNextResponse.success({ data: safeUsers });
};


export const POST = async (req: NextRequest) => {
  const body: z.infer<typeof createUserSchema> = await req.json();

  const validate = createUserSchema.safeParse(body);
  if (!validate.success) {
    return CustomNextResponse.error({ errors: [], message: 'Bad Params' }, 400);
  }

  const user = await prismadb.user.create({
    data: { ...body },
    select: prismaExclude('User', ['hashedPassword'])
  });
  return CustomNextResponse.success({ data: user });
};
