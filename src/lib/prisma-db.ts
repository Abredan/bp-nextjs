import { PrismaClient } from '@prisma/client';
import type { PrismaClient as PrismaClientType } from '@prisma/client';
let prismadb: PrismaClientType;

declare global {
  var prismadb: any;
}

if (process.env.NODE_ENV === 'production') {
  prismadb = new PrismaClient();
} else {
  if (!globalThis.prismadb) {
    globalThis.prismadb = new PrismaClient();
  }

  prismadb = globalThis.prismadb;
}

export default prismadb;
