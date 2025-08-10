import app from "./app";

if (process.env.NODE_ENV === "dev") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log("in development mode");
    console.log(`now listening to ${PORT}`);
  });
} else {
  // TODO for production
}

export default app;
