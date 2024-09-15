import app from "./app";

// console.log('sss')

// // dotenv
// import dotenv from 'dotenv'
// dotenv.config()

// // parse body
// import bodyParser from 'body-parser'
// app.use(bodyParser.json())

// // passport
// import passport from './middleware/passport.js'
// app.use(passport.initialize())

// // session:
// import session from 'express-session'
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
// }))

// // CORS
// import cors from './middleware/cors.js'
// app.use(cors)

// start
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
