import { NextRequest } from 'next/server';
import { z } from 'zod';
import { updateUserPasswordSchema } from '@/dto/users.dto';
import { CustomNextResponse } from '@/lib/helpers';
import prismadb from '@/lib/prisma-db';
import bcrypt from 'bcrypt';

export const PATCH = async (req: NextRequest) => {
  const body: z.infer<typeof updateUserPasswordSchema> = await req.json();
  const validate = updateUserPasswordSchema.safeParse(body);
  if (!validate.success) {
    return CustomNextResponse.error({ errors: [], message: 'Bad Params' }, 400);
  }

  const hashedPassw = await bcrypt.hash(body.password, 12);
  const updateUser = await prismadb.user.update({
    where: {
      id: body.id
    },
    data: { hashedPassword: hashedPassw }
  });
  return CustomNextResponse.success({ message: 'User password updated' });
};
