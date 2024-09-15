import glob from "glob";
import path from "path";

// This mechanism will create the server only once in __APP__ and then do all the integration tests
it("app is defined", () => {
  expect((global as any).__APP__).toBeDefined();
});

glob.sync("./tests/integration/**/*.test.ts").forEach(function (file: string) {
  require(path.resolve(file));
});
