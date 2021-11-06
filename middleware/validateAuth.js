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
  const email = await extractEmailFromToken(req);
  if (!email) return res.status(401).send();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(401).send();

  const managerRole = await prisma.role.findFirst({
    where: { description: 'manager' },
  });

  if (!managerRole) return res.status(500).send();

  if (user.roleId !== managerRole.id) return res.status(401).send();
  next();
};

module.exports = {
  validateManager,
};
