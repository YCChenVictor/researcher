import * as React from "react";

import Create from "./Articles/Create";
import List from "./Articles/List";

type Articles = {
  url: string;
  content: string;
}[];

const Articles = () => {
  return (
    <div>
      <h1>Articles</h1>
      <Create />
      <List />
    </div>
  );
};

export default Articles;
