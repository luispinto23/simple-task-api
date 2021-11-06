const prisma = require('../db-client');
const {
  Roles,
  Tasks,
  Users,
  hashUsersPass,
  generateUsersJWT,
} = require('../data/seedData');

const main = async () => {
  await prisma.role.createMany({
    data: Roles,
  });
  await hashUsersPass(Users);
  // await generateUsersJWT(Users);
  await prisma.user.createMany({
    data: Users,
  });
  await prisma.task.createMany({
    data: Tasks,
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
