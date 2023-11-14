import { CustomNextResponse } from '@/lib/helpers';
import { NextRequest } from 'next/server';
import prismadb from '@/lib/prisma-db';
import { PERMISSIONS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const tables: { schemaname: string; tablename: string }[] = await prismadb.$queryRaw`
      SELECT schemaname,tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'`;

  let permissions: Permission[] = [
    { code: '_account', description: 'Manage account', group: 'built-in' },
    { code: '_root', description: 'Master rights', group: 'built-in' },
  ];
  permissions = [...permissions,...tables.flatMap((t) =>
    PERMISSIONS.map((perm: string) => ({
      code: `${t.tablename}.${perm}`,
      description: `${perm} entries in ${t.tablename}`,
      group: t.tablename
    })),
  )];

  return CustomNextResponse.success({ data: permissions });
}
