const request = require('supertest');
const app = require('../app');

describe('Sword task api', () => {
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
