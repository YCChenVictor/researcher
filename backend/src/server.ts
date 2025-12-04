import app from "./app";

app.listen(5000, () => {
  console.log("in development mode");
  console.log(`now listening to ${5000}`);
});

export default app;
