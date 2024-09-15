import request from "supertest";
import app from "../../src/app";

describe("POST /create", () => {
  it("should respond with the expected data", async () => {
    const res = await request(app).post("/node-graph/create");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Node graph created successfully" });
  });
});
