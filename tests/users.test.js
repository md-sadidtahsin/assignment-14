// Set environment variable for JWT secret in tests
process.env.SECRET_KEY = 'test-secret-key';

const request = require('supertest');
const app = require('../src/app');

describe("Express App", () => {
  describe("Root route", () => {
    it("should return Hello World", async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello World");
    });
  });

  describe("Eval route", () => {
    it("should evaluate 2 + 2 correctly", async () => {
      const res = await request(app)
        .get('/eval')
        .query({ code: '2 + 2' });
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("4");
    });

    it("should return 400 for invalid code", async () => {
      const res = await request(app)
        .get('/eval')
        .query({ code: 'invalid' });
      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Invalid code");
    });
  });

  describe("Login route", () => {
    it("should generate a JWT token", async () => {
      const res = await request(app)
        .post('/login')
        .send({ user: "testuser" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      // Optionally verify the token structure
      expect(typeof res.body.token).toBe('string');
    });
  });

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
});

