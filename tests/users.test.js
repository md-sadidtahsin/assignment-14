const request = require('supertest');
const express = require('express');
const usersRouter = require('../routes/users');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe("Users API", () => {
  it("should add a user", async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: "Alice" });
    expect(res.statusCode).toBe(201);
  });

  it("should list users", async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
