const request = require('supertest');
const app = require('../app');
const { encryptMessage, decryptMessage } = require('../crypto');

let managerAuthToken;
let techAuthToken;

let managerTaskId;
let techTaskId;

describe('Sword task api', () => {
  it('POST /auth/login as a manager', async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .send({
        email: 'manager@sword.com',
        password: process.env.DEFAULT_PASSWORD,
      })
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    managerAuthToken = body.token;
  });

  it('POST /auth/login as a tech', async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .send({
        email: 'tech@sword.com',
        password: process.env.DEFAULT_PASSWORD,
      })
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    techAuthToken = body.token;
  });

  it('POST /tasks as a manager', async () => {
    const { body } = await request(app)
      .post('/tasks')
      .send({
        summary: 'Testing POST task as a manager',
      })
      .set('Authorization', managerAuthToken)
      .expect(201);

    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 1,
      })
    );

    managerTaskId = body.id;
  });

  it('POST /tasks as a tech', async () => {
    const { body } = await request(app)
      .post('/tasks')
      .send({
        summary: 'Testing POST task as a technician',
      })
      .set('Authorization', techAuthToken)
      .expect(201);

    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 3,
      })
    );

    techTaskId = body.id;
  });

  it('PUT /tasks as a manager', async () => {
    const { body } = await request(app)
      .put(`/tasks/${managerTaskId}`)
      .send({
        summary: 'Test PUT task as a manager',
      })
      .set('Authorization', managerAuthToken)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        id: managerTaskId,
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 1,
      })
    );
  });

  it('PUT /tasks as a tech', async () => {
    const { body } = await request(app)
      .put(`/tasks/${techTaskId}`)
      .send({
        summary: 'Test PUT task as a tech',
      })
      .set('Authorization', techAuthToken)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        id: techTaskId,
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 3,
      })
    );
  });

  it('PUT /tasks from tech as a manager should fail', async () => {
    return request(app)
      .put(`/tasks/${techTaskId}`)
      .send({
        summary: 'Test PUT to a technician task as a manager',
      })
      .set('Authorization', managerAuthToken)
      .expect(401);
  });

  it('PUT /tasks from manager as a tech should fail', async () => {
    return request(app)
      .put(`/tasks/${managerTaskId}`)
      .send({
        summary: 'Test PUT to a manager task as a technician',
      })
      .set('Authorization', techAuthToken)
      .expect(401);
  });

  it('GET /tasks all tasks as a manager', async () => {
    const { body } = await request(app)
      .get(`/tasks`)
      .set('Authorization', managerAuthToken)
      .expect(200);

    if (body.length) {
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            summary: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            authorId: expect.any(Number),
          }),
        ])
      );
    } else {
      expect(body).toEqual([]);
    }
  });

  it('GET /tasks all tasks as a tech', async () => {
    return request(app)
      .get(`/tasks`)
      .set('Authorization', techAuthToken)
      .expect(401);
  });

  it('GET /tasks by id as a manager', async () => {
    const { body } = await request(app)
      .get(`/tasks/${managerTaskId}`)
      .set('Authorization', managerAuthToken)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        id: managerTaskId,
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 1,
      })
    );
  });

  it('GET /tasks by id as a tech', async () => {
    const { body } = await request(app)
      .get(`/tasks/${techTaskId}`)
      .set('Authorization', techAuthToken)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        id: techTaskId,
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 3,
      })
    );
  });

  it('GET /tasks from a technician by id as a manager', async () => {
    const { body } = await request(app)
      .get(`/tasks/${techTaskId}`)
      .set('Authorization', managerAuthToken)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        id: techTaskId,
        summary: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        authorId: 3,
      })
    );
  });

  it('GET /tasks from other user as tech should fail', async () => {
    return request(app)
      .get(`/tasks/${managerTaskId}`)
      .set('Authorization', techAuthToken)
      .expect(401);
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
