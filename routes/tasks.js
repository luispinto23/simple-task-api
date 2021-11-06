const express = require('express');
const router = express.Router();
const {
  validateManager,
  validateUser,
  validateAuthor,
} = require('../middleware/validateAuth');

const prisma = require('../db-client');
const emitter = require('../events/emitter');
const SUMMARY_CHAR_LIMIT = 2500;

router.get('/', validateUser, validateManager, async (req, res) => {
  if (!res.locals.isManager) return res.status(401).send();

  const allTasks = await prisma.task.findMany();

  return res.json(allTasks);
});

router.get(
  '/:id',
  validateUser,
  validateManager,
  validateAuthor,
  async (req, res, next) => {
    if (!res.locals.task) return res.status(401).send();

    return res.json(res.locals.task);
  }
);

// I'll assume that even the manager can create tasks, despite that not being mentioned in the challenge description
router.post('/', validateUser, async (req, res, next) => {
  const taskDTO = req.body;

  if (!taskDTO || taskDTO.summary.length > SUMMARY_CHAR_LIMIT)
    return res.status(500).send();

  const { user } = res.locals;

  try {
    const newTask = await prisma.task.create({
      data: { ...taskDTO, authorId: Number(user.id) },
    });

    emitter.emit('taskCreated', newTask.id, user.name, newTask.createdAt);
    return res.status(201).json(newTask);
  } catch (err) {
    console.error(error);
    return res.status(500).json();
  }
});

router.put('/:id', validateUser, validateAuthor, async (req, res, next) => {
  const taskDTO = req.body;
  const { user } = res.locals;

  if (!taskDTO || taskDTO.summary.length > SUMMARY_CHAR_LIMIT)
    return res.status(500).send();

  const { task } = res.locals;

  delete task.updatedAt;
  const updatedTaskObj = { ...task, ...taskDTO };

  try {
    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: updatedTaskObj,
    });

    emitter.emit(
      'taskUpdated',
      updatedTask.id,
      user.name,
      updatedTask.updatedAt
    );

    return res.json(updatedTask);
  } catch (err) {
    console.error(err);
    return res.status(500).json();
  }
});

router.delete('/:id', validateUser, validateManager, async (req, res, next) => {
  if (!res.locals.isManager) return res.status(401).send();

  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json();
  }

  return res.status(200).json();
});

module.exports = router;
