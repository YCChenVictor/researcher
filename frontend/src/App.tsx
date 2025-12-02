import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ArticleItem from "./components/Articles/Article";
import Articles from "./components/Articles";
// import { importAllFilesAndFetchContents } from "./utils/loadArticles";
import Main from "./components/Main";
// import { NodesStructure } from "./types/nodesStructure";
// import nodeStructure from "./node-structure.json";
import { ServerProvider } from "./components/ServerProvider";

// interface Article {
//   name: string;
//   path: string;
//   sha: string;
//   size: number;
// }

const App: React.FC = () => {
  const [articles] = useState<{ url: string; content: string }[]>(
    [],
  );
  // const [articleRoutes, setArticleRoutes] = useState<Element[]>([]);
  // const [, setNodesStructure] = useState<NodesStructure>({
  //   nodes: [],
  //   links: [],
  //   rawLinks: {},
  // });

  // const importAll = (context: __WebpackModuleApi.RequireContext) => {
  //   return context.keys().map((key) => {
  //     return { url: key, staticUrl: context(key) as string };
  //   });
  // };

  const fetchData = async () => {
    try {
      // Problem is that the backend does not return all articles
      // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/articles`);
      // const articles = (await res.json()) as Article[];

      if (articles.length) {
        // const routes = articles.map((item) => (
        //   <Route
        //     key={item.name}
        //     path={`articles/${item.path}`}
        //     element={
        //       <ArticleItem
        //         filePath={item.path}
        //         // parents={
        //         //   (
        //         //     nodeStructure.rawLinks as Record<
        //         //       string,
        //         //       { parents: string[] }
        //         //     >
        //         //   )[item.url]?.parents || []
        //         // }
        //         // children={
        //         //   (
        //         //     nodeStructure.rawLinks as Record<
        //         //       string,
        //         //       { children: string[] }
        //         //     >
        //         //   )[item.url]?.children || []
        //         // }
        //       />
        //     }
        //   />
        // ));
        // setArticleRoutes(routes);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-600 py-4">
      <div className="prose p-4 mx-auto flex flex-col lg:flex-row lg:space-x-4">
        <Router>
          <Routes>
            <Route
              path="/articles"
              element={<Articles articles={articles} />}
            />
            <Route
              path="/"
              element={<Main articles={articles} />}
            />
            {/* {articleRoutes} */}
          </Routes>
        </Router>
      </div>
    </div>
  );
};

const AppWithServerProvider = () => (
  <ServerProvider>
    <App />
  </ServerProvider>
);

export default AppWithServerProvider;
