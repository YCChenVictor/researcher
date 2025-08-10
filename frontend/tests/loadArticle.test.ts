import { importAllFilesAndFetchContents } from "../src/utils/loadArticles";

describe("importAllFilesAndFetchContents", () => {
  it("should fetch contents of all markdown files", async () => {
    const markdownFiles = [
      { url: "test1.md", staticUrl: "http://localhost/test1.md" },
      { url: "test2.md", staticUrl: "http://localhost/test2.md" },
    ];

    // Mock fetch responses
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        text: () => {
          if (url === "http://localhost/test1.md")
            return Promise.resolve(
              "# Test 1\nThis is the content of test1.md.",
            );
          if (url === "http://localhost/test2.md")
            return Promise.resolve(
              "# Test 2\nThis is the content of test2.md.",
            );
          return Promise.reject("File not found");
        },
      }),
    ) as jest.Mock;

    const result = await importAllFilesAndFetchContents(markdownFiles);

    expect(result).toEqual([
      { url: "test1", content: "# Test 1\nThis is the content of test1.md." },
      { url: "test2", content: "# Test 2\nThis is the content of test2.md." },
    ]);
  });
});
