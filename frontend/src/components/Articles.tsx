import * as React from "react";
import { NodesStructure } from "../types/nodesStructure";

type Articles = {
  url: string;
  content: string;
}[];

const Articles = ({
  articles,
}: {
  articles: Articles;
  nodesStructure: NodesStructure;
}) => {
  // Group articles by their category
  const grouped: Record<string, string[]> = {};
  for (const article of articles) {
    const parts = article.url.split("/");
    const name = parts.pop() || "";
    const category = parts.pop() || "base";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(name);
  }

  const list = Object.keys(grouped).map((category, index) => (
    <div key={index} className="mb-6">
      <h2 className="font-bold text-gray-800 mb-4">{category}</h2>{" "}
      <div className="space-y-4">
        {grouped[category].map((title) => {
          const url = `${category}/${title}`;
          const key = `${category}/${title}`;

          return (
            <div key={key} className="flex">
              <div className="p-4 bg-gray-600 rounded-lg shadow-md hover:bg-gray-200">
                <a href={url} className="text-black hover:underline">
                  {title}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Articles</h1>
      {list}
    </div>
  );
};

export default Articles;
