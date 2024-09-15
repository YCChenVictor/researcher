import User from "../models/user.js";
import jwt from "jsonwebtoken";
import passport from "../middleware/passport.js";

const userAPIs = (app) => {
  app.get("/authentication", passport.authenticate("jwt"), (req, res) => {
    res.status(200).json({ loggedIn: true });
  });

  app.post("/signup", async (req, res, next) => {
    const { email, password } = req.body.params; // Destructure email and password from req.body.params

    if (!email || !password) {
      return res.status(401).json({ msg: "Please enter all fields" });
    }

    try {
      const newUser = await User.create({
        email,
        password,
      });

      console.log(newUser);

      const payload = {
        email: email,
        expireAt: Math.floor(Date.now() / 1000) + 60 * 60, // Token will expire in 1 hour
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY); // Wrap the payload in an object
      res.json({ token });
    } catch (error) {
      // Handle error during user creation
      console.error(error);
      res.status(500).json({ msg: "An error occurred" });
    }
  });

  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ token: req.user.token });
  });
};

export default userAPIs;
