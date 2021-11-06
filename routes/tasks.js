const express = require('express');
const router = express.Router();
const { validateManager } = require('../middleware/validateAuth');

const prisma = require('../db-client');

const tasks = [
  { id: 1, description: 'sample task', date: new Date().getTime(), userId: 0 },
];

router.get('/', validateManager, async (req, res) => {
  const allTasks = await prisma.task.findMany();

  res.json(allTasks);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) return res.status(404).send();

  res.json(task);
});

router.post('/', async (req, res, next) => {
  const taskDTO = req.body;

  if (!taskDTO) return res.status(500).send();

  const newTask = await prisma.task.create({
    data: { ...taskDTO },
  });

  res.status(201).json(newTask);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  const task = tasks.find(task => task.id === Number(id));

  if (!task) return res.status(404).send();

  const updatedTask = { ...task, ...req.body };

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  tasks[taskIndex] = updatedTask;

  res.json(updatedTask);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex < 0) return res.status(404).send();

  // TODO: some DB logic goes here
  tasks.splice(taskIndex);

  res.status(200).json();
});

module.exports = router;
