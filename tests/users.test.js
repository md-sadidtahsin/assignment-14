const request = require("supertest");
const app = require("../src/app");

describe("App.js endpoints", () => {
  it("GET / returns Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello World");
  });

  it("GET /eval with 2+2 returns 4", async () => {
    const res = await request(app).get("/eval?code=2%2B2");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("4");
  });

  it("GET /eval with invalid code returns 400", async () => {
    const res = await request(app).get("/eval?code=bad");
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Invalid code");
  });

  it("POST /login returns token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ user: "demo" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Users API", () => {
  it("POST /users should add a user", async () => {
    const newUser = { name: "Alice" };

    const res = await request(app)
      .post("/users")
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("User added");
  });

  it("GET /users should list users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(u => u.name === "Alice")).toBe(true);
  });
});