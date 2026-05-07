const request = require("supertest");
const app = require("../app"); // import your Express app

describe("App endpoints", () => {
  it("should return 200 on /health", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });

  it("should return 200 on /users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});