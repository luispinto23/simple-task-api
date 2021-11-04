const request = require('supertest');
const app = require('./app');

describe('Sword task api', () => {
  it('GET /tasks => Return a list of tasks', async () => {
    const response = await request(app).get('/tasks').expect(200);

    if (response.body.length) {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            description: expect.any(String),
            date: expect.any(Number),
            userId: expect.any(Number),
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
        date: expect.any(Number),
        userId: expect.any(Number),
      })
    );
  });

  it.todo('POST /tasks => Create a new task');
  it.todo('PUT /tasks/:id => Update a specific task');
  it.todo('DELETE /tasks/:id => Delete a specific task');
});
