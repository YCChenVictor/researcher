// import User from '../models/user';
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import jwt from "jsonwebtoken";
import passportJWT from "passport-jwt";
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
  async (username, password, done) => {
    // const user = await User.findOne({
    //   username,
    //   password,
    // });
    // const payload = {
    //   email: username,
    //   expireAt: Math.floor(Date.now() / 1000) + 60 * 60, // Token will expire in 1 hour
    // };
    // if (!user) {
    //   return done(null, false, { message: 'no user' });
    // } else {
    //   const secretKey = 'your_secret_key'; // Replace 'your_secret_key' with your actual secret key
    //   const token = jwt.sign(payload, secretKey);
    //   return done(null, { token });
    // }
  },
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_secret_key", // Replace 'your_secret_key' with your actual secret key
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  done(null, jwtPayload);
});

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;
