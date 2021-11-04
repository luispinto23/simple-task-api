var express = require('express');
var httpError = require('http-errors');
var router = express.Router();

//TODO: Change to persisted data
const tasks = [
  { id: 1, description: 'sample task', date: new Date().getTime(), userId: 0 },
];

router.get('/', (req, res, next) => {
  res.json(tasks);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  const task = tasks.find(task => task.id === Number(id));

  if (!task) return next(httpError(404, 'Not found'));

  res.json(task);
});

router.post('/', (req, res, next) => {
  const taskDTO = req.body;

  if (!taskDTO) return next(httpError[500]);
  // TODO: refactor when using DB
  const newTask = { id: tasks.length + 1, ...taskDTO };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  const task = tasks.find(task => task.id === Number(id));

  if (!task) return next(httpError(404, 'Not found'));

  const updatedTask = { ...task, ...req.body };

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  tasks[taskIndex] = updatedTask;

  res.json(updatedTask);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex < 0) return next(httpError(404, 'Not found'));

  // TODO: some DB logic goes here
  tasks.splice(taskIndex);

  res.status(200).json();
});

module.exports = router;
