const jwt = require('jsonwebtoken');
const prisma = require('../db-client');

const extractEmailFromToken = async req => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) return null;

  const token = tokenHeader.split(' ');

  try {
    const user = await jwt.verify(token[1], process.env.JWT_SECRET);
    return user.email;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const validateManager = async (req, res, next) => {
  const { user } = res.locals;

  const managerRole = await prisma.role.findFirst({
    where: { description: 'manager' },
  });

  if (!managerRole) return res.status(500).send();

  user.roleId === managerRole.id
    ? (res.locals.isManager = true)
    : (res.locals.isManager = false);

  next();
};

const validateAuthor = async (req, res, next) => {
  const { user } = res.locals;
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) return res.status(404).send();

  if (res.locals.isManager || task.authorId === user.id) {
    res.locals.task = task;
  } else {
    return res.status(401).send();
  }
  next();
};

const validateUser = async (req, res, next) => {
  const email = await extractEmailFromToken(req);
  if (!email) return res.status(401).send();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(401).send();

  res.locals.user = user;

  next();
};

module.exports = {
  validateManager,
  validateAuthor,
  validateUser,
};
