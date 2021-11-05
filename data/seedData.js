const bcrypt = require('bcrypt');
const faker = require('faker');

faker.locale = 'pt_PT';

const Tasks = [
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.finance.transactionDescription(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
];

const Users = [
  { email: faker.internet.email(), name: faker.name.findName(), roleId: 1 },
  { email: faker.internet.email(), name: faker.name.findName(), roleId: 1 },
  { email: faker.internet.email(), name: faker.name.findName(), roleId: 2 },
  { email: faker.internet.email(), name: faker.name.findName(), roleId: 2 },
  { email: faker.internet.email(), name: faker.name.findName(), roleId: 2 },
];

const hashUsersPass = async users => {
  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(process.env.DEFAULT_PASSWORD, salt);
  }
};

const Roles = [
  {
    description: 'manager',
  },
  {
    description: 'technician',
  },
];

module.exports = {
  hashUsersPass,
  Roles,
  Users,
  Tasks,
};
