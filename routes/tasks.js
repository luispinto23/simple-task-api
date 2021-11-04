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

module.exports = router;
