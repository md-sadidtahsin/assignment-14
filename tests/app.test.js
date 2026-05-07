const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  it("should return hello message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello SonarQube!");
  });
});

describe("GET /sum", () => {
  it("should return sum", async () => {
    const res = await request(app).get("/sum?a=2&b=3");
    expect(res.body.result).toBe(5);
  });
});