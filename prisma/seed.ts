import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await createRoles();
}

const createRoles = async () => {
  const roles = [
    { displayName: 'Basic', permissions: ['_account'], enabled: true },
    { displayName: 'Admin', permissions: ['_account'], enabled: true },
    { displayName: 'Super', permissions: ['_account', '_root'], enabled: true },
  ];
  return prisma.role.createMany({ data: roles });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
