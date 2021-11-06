const bcrypt = require('bcrypt');
const express = require('express');
const JWT = require('jsonwebtoken');

const router = express.Router();
const prisma = require('../db-client');

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) return res.status(404).send();

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return res.status(404).send();

  const token = JWT.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2 days' }
  );

  res.json({
    token: `Bearer ${token}`,
  });
});

module.exports = router;
