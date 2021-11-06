const express = require('express');
const router = express.Router();
const {
  validateManager,
  validateUser,
  validateAuthor,
} = require('../middleware/validateAuth');

const prisma = require('../db-client');

const tasks = [
  { id: 1, description: 'sample task', date: new Date().getTime(), userId: 0 },
];

router.get('/', validateUser, validateManager, async (req, res) => {
  if (!res.locals.isManager) return res.status(401).send();

  const allTasks = await prisma.task.findMany();

  res.json(allTasks);
});

router.get(
  '/:id',
  validateUser,
  validateManager,
  validateAuthor,
  async (req, res, next) => {
    if (!res.locals.task) return res.status(401).send();

    res.json(res.locals.task);
  }
);

// I'll assume that even the manager can create tasks, despite that not being mentioned in the challenge description
router.post('/', validateUser, async (req, res, next) => {
  const taskDTO = req.body;

  if (!taskDTO) return res.status(500).send();

  const { user } = res.locals;

  try {
    const newTask = await prisma.task.create({
      data: { ...taskDTO, authorId: Number(user.id) },
    });
  } catch (err) {
    console.error(error);
    res.status(500).json();
  }
  res.status(201).json(newTask);
});

router.put('/:id', validateUser, validateAuthor, async (req, res, next) => {
  const { task } = res.locals;

  delete task.updatedAt;
  const updatedTaskObj = { ...task, ...req.body };

  try {
    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: updatedTaskObj,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
  res.json(updatedTask);
});

router.delete('/:id', validateUser, validateManager, async (req, res, next) => {
  if (!res.locals.isManager) res.status(401).send();

  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }

  res.status(200).json();
});

module.exports = router;
