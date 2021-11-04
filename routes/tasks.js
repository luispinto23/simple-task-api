var express = require('express');
var router = express.Router();

const tasks = [];

/* GET tasks listing. */
router.get('/', (req, res, next) => {
  res.json(tasks);
});

module.exports = router;
