import request from "supertest";

describe("GET /", () => {
  it("should return Hello World!", () => {
    request((global as any).__APP__)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("Hello World!");
      });
  });
});
