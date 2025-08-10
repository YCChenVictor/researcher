import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import Articles from "./components/Articles";
import { importAllFilesAndFetchContents } from "./utils/loadArticles";
import Main from "./components/Main";
import { NodesStructure } from "./types/nodesStructure";
import nodeStructure from "./node-structure.json";
import { ServerProvider, useServer } from "./components/ServerProvider";

const backendUrl = process.env.REACT_APP_BACKEND_URL ?? "";

const App: React.FC = () => {
  const backendHost = process.env.REACT_APP_BACKEND_URL ?? "";
  const [articles, setArticles] = useState<{ url: string; content: string }[]>(
    [],
  );
  const [articleRoutes, setArticleRoutes] = useState<JSX.Element[]>([]);
  const [nodesStructure, setNodesStructure] = useState<NodesStructure>({
    nodes: [],
    links: [],
    rawLinks: {},
  });
  const { serverOn, setServerOn } = useServer();

  const checkServer = async () => {
    try {
      const serverResponse = await axios.get(backendHost);
      if (
        serverResponse.status === 200 &&
        process.env.NODE_ENV === "development"
      ) {
        setServerOn(true);
      }
    } catch {
      setServerOn(false);
    }
  };

  const importAll = (context: __WebpackModuleApi.RequireContext) => {
    return context.keys().map((key) => {
      return { url: key, staticUrl: context(key) as string };
    });
  };

  const handleRefreshNodes = async () => {
    try {
      if (!backendUrl) throw new Error("BACKEND_URL env is not set");

      const response = await fetch(backendUrl + "/refresh-nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "value" }),
      });

      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      console.log("Backend Response:", result);
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  const handleRefreshLinks = async () => {
    try {
      if (!backendUrl) throw new Error("BACKEND_URL env is not set");

      const response = await fetch(backendUrl + "/refresh-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "value" }),
      });

      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      console.log("Backend Response:", result);
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNodesStructure(nodeStructure);

        const markdownFiles = importAll(
          require.context("./articles/", true, /^(?!.*in-progress).*\.md$/),
        );

        await checkServer();
        const articles = await importAllFilesAndFetchContents(markdownFiles);
        setArticles(articles);

        if (nodeStructure && articles.length) {
          const routes = articles.map((item) => (
            <Route
              key={item.url}
              path={item.url}
              element={
                <Article
                  filePath={item.url}
                  content={item.content}
                  parents={
                    (
                      nodeStructure.rawLinks as Record<
                        string,
                        { parents: string[] }
                      >
                    )[item.url]?.parents || []
                  }
                  children={
                    (
                      nodeStructure.rawLinks as Record<
                        string,
                        { children: string[] }
                      >
                    )[item.url]?.children || []
                  }
                />
              }
            />
          ));
          setArticleRoutes(routes);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-600 py-4">
      <div className="p-4">
        <a
          href="/"
          className="text-2xl font-bold text-gray-900 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-lg shadow inline-block text-center"
        >
          Homepage
        </a>
        {serverOn && (
          <>
            <button
              onClick={handleRefreshNodes}
              className="text-2xl font-bold text-gray-900 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-lg shadow"
            >
              Refresh Nodes
            </button>
            <button
              onClick={handleRefreshLinks}
              className="text-2xl font-bold text-gray-900 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-lg shadow"
            >
              Refresh Links
            </button>
          </>
        )}
      </div>
      <div className="prose p-4 mx-auto flex flex-col lg:flex-row lg:space-x-4">
        <Router>
          <Routes>
            <Route
              path="/articles"
              element={
                <Articles articles={articles} nodesStructure={nodesStructure} />
              }
            />
            <Route
              path="/"
              element={<Main articles={articles} serverOn={serverOn} />}
            />
            {articleRoutes}
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
