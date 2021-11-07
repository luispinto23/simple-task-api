const bcrypt = require('bcrypt');
const faker = require('faker');
const { encryptMessage } = require('../crypto');

faker.locale = 'pt_PT';

const Tasks = [
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
    authorId: Math.floor(Math.random() * 5) + 1,
  },
  {
    summary: faker.git.commitMessage(),
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

const encryptTasksSummary = tasks => {
  const encryptedTasks = tasks.map(task => {
    const { summary } = task;

    const encryptedSummary = encryptMessage(summary);
    return { ...task, summary: encryptedSummary };
  });

  return encryptedTasks;
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
  encryptTasksSummary,
  Roles,
  Users,
  Tasks,
};
