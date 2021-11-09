const EventEmitter = require('events');

const myEmitter = new EventEmitter();

function c1(taskId, authorId, createdAt) {
  console.log(`Task ${taskId} preformed by ${authorId} at ${createdAt}`);
}

function c2(taskId, authorId, updatedAt) {
  console.log(`Task ${taskId} updated by ${authorId} at ${updatedAt}`);
}

myEmitter.on('taskCreated', c1);
myEmitter.on('taskUpdated', c2);

module.exports = myEmitter;
