import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prisma-db';
import { CustomNextResponse } from '@/lib/helpers';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const roles = await prismadb.role.findMany();
  return CustomNextResponse.success({
    data: roles,
    page: 1,
    total_items: 1,
    items_per_page: ITEMS_PER_PAGE,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({});
}
