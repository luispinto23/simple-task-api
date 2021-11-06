const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
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

const generateUsersJWT = async users => {
  for (const user of users) {
    const token = JWT.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2 days' }
    );
    user.token = token;
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
  // generateUsersJWT,
  Roles,
  Users,
  Tasks,
};
