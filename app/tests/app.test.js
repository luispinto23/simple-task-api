const request = require('supertest');
const app = require('../app');

let managerAuthToken;
let techAuthToken;

describe('Sword task api', () => {
  it.only('POST /auth/login as a manager', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'tech@sword.com',
        password: process.env.DEFAULT_PASSWORD,
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it.todo('POST /login as a tech');

  it.todo('POST /task as a manager');
  it.todo('POST /task as a tech');

  it.todo('PUT /task as a manager');
  it.todo('PUT /task as a tech');
  it.todo('PUT /task from tech as a manager');
  it.todo('PUT /task from manager as a tech');
  it.todo('PUT /task from other user');

  it.todo('GET /task all tasks as a manager');
  it.todo('GET /task all tasks as a tech');

  it.todo('GET /task by id as a manager');
  it.todo('GET /task by id as a tech');
  it.todo('GET /task from tech by id as a manager');
  it.todo('GET /task from other user as tech');

  it('GET /tasks => Return a list of tasks', async () => {
    const response = await request(app).get('/tasks').expect(200);

    if (response.body.length) {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            description: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            authorId: expect.any(Number),
          }),
        ])
      );
    } else {
      expect(response.body).toEqual([]);
    }
  });
  it('GET /tasks/:id => Return a specific task', async () => {
    const response = await request(app).get('/tasks/1').expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        description: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: expect.any(Number),
      })
    );
  });

  it('POST /tasks => Create a new task', async () => {
    const taskDate = new Date().getTime();
    const response = await request(app)
      .post('/tasks')
      .send({ description: 'another task', authorId: 1 })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        description: 'another task',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 1,
      })
    );
  });

  it('PUT /tasks/:id => Update a specific task', async () => {
    const newDescription = 'new description';

    const response = await request(app)
      .put('/tasks/1')
      .send({ description: newDescription })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        description: newDescription,
        date: expect.any(Number),
        userId: expect.any(Number),
      })
    );
  });

  it('DELETE /tasks/:id => Delete a specific task', async () => {
    await request(app).delete('/tasks/1').expect(200);
  });
});

describe('Message encryption', () => {
  const ORIGINAL_MESSAGE = 'This is a plain text message';
  let encryptedMessage;

  it('Should be able to encrypt the original message', () => {
    const hexadecimal = /[0-9A-Fa-f]{6}/g;
    encryptedMessage = encryptMessage(ORIGINAL_MESSAGE);

    expect(encryptedMessage).not.toBe(ORIGINAL_MESSAGE);
    expect(encryptedMessage).toMatch(hexadecimal);
  });

  it('Should be able to decrypt the encrypted message', () => {
    const decryptedMessage = decryptMessage(encryptedMessage);

    expect(decryptedMessage).toEqual(ORIGINAL_MESSAGE);
  });
});
