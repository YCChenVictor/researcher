import request from "supertest";
import app from "../../src/app";

describe("GET /", () => {
  it("should return Hello World!", () => {
    request(app)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("Hello World!");
      });
  });
});
