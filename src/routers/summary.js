import user from "./user.js";
import nodeGraph from "./nodeGraphRouter.js";
// import searchbar from './searchbar.js'
// import gptApis from './gpt-apis.ts'
// import autoFrontend from './auto-frontend.js'

function apis(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  user(app);
  nodeGraph(app);
  // searchbar(app)
  // gptApis(app)
  // autoFrontend(app)
}

export default apis;
