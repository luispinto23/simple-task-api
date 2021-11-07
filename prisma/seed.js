const prisma = require('../db-client');
const {
  Roles,
  Tasks,
  Users,
  hashUsersPass,
  encryptTasksSummary,
} = require('../data/seedData');

const main = async () => {
  await prisma.role.createMany({
    data: Roles,
  });
  await hashUsersPass(Users);
  await prisma.user.createMany({
    data: Users,
  });
  const encryptedTasks = encryptTasksSummary(Tasks);
  await prisma.task.createMany({
    data: encryptedTasks,
  });
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
