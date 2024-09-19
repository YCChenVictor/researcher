import request from "supertest";
import app from "../../src/app";
import * as generateGraphDataModule from "../../src/services/generate-graph-data";

describe("POST /create", () => {
  jest.mock("../../src/services/generate-graph-data");

  it("should respond with the expected data", async () => {
    jest.spyOn(generateGraphDataModule, "default").mockResolvedValue({
      nodes: [
        {
          id: 1,
          name: "web-development",
          url: "https://ycchenvictor.netlify.app/web-development/",
          group: 2,
        },
        {
          id: 2,
          name: "main",
          url: "https://ycchenvictor.netlify.app/",
          group: 1,
        },
      ],
      links: [{ source: 1, target: 2 }],
    });
    const res = await request(app).post("/node-graph/create");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      nodes: [
        {
          id: 1,
          name: "web-development",
          url: "https://ycchenvictor.netlify.app/web-development/",
          group: 2,
        },
        {
          id: 2,
          name: "main",
          url: "https://ycchenvictor.netlify.app/",
          group: 1,
        },
      ],
      links: [{ source: 1, target: 2 }],
    });
  });
  jest.clearAllMocks();
});
