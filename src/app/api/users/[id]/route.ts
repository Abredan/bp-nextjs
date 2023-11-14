import { NextRequest } from 'next/server';
import { z } from 'zod';
import { updateUserSchema } from '@/dto/users.dto';
import { CustomNextResponse } from '@/lib/helpers';
import prismadb from '@/lib/prisma-db';

export const PATCH = async (req: NextRequest) => {
  const body: z.infer<typeof updateUserSchema> = await req.json();
  const validate = updateUserSchema.safeParse(body);
  if (!validate.success) {
    return CustomNextResponse.error({ errors: [], message: 'Bad Params' }, 400);
  }
  const updateUser = await prismadb.user.update({
    where: { id: body.id },
    data: { ...body }
  });
  return CustomNextResponse.success({ message: 'User updated', data: { id: updateUser.id } });
};


export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const id = searchParams.get('id') as string;
    await prismadb.user.delete({ where: { id } });
    return CustomNextResponse.success({ message: 'User deleted', data: { id } });
  } catch (e) {
    console.error(e);
    return CustomNextResponse.error({ message: 'Something not works correctly', errors: [] }, 500);
  }
};
