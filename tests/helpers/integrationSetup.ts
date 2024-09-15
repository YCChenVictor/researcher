import app from "../../src/app";

beforeAll(() => {
  // setup the app
  (global as any).__APP__ = app.listen(3001, () => {
    console.log("test server started");
  });
});

afterAll(() => {
  // teardown the app
  (global as any).__APP__.close();
});
