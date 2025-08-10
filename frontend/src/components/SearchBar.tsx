import React, { useState } from "react";

const SearchBar = ({
  articles,
}: {
  articles: { url: string; content: string }[];
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const searchArticles = () => {
    return articles.filter((article) => {
      const articleText = `${article.url} ${article.content}`.toLowerCase();
      const searchText = query.toLowerCase();

      return articleText.includes(searchText); // the core
    });
  };

  return (
    <div id="search-bar" style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search keyword"
        value={query}
        onChange={handleInputChange}
        className="p-3 text-base border border-gray-300 rounded-md w-full max-w-xs focus:outline-none focus:border-blue-500 placeholder-gray-400"
      />

      {query && (
        <ul className="absolute top-full left-0 right-0 bg-gray-600 bg-opacity-60 z-10 p-0 m-0 list-none border border-gray-300 rounded-md max-h-60 overflow-y-auto">
          {searchArticles()
            .sort((a, b) => (a.url > b.url ? 1 : -1))
            .map((article) => {
              if (article.url === "") {
                return null;
              } else {
                return (
                  <li key={article.url}>
                    <a href={article.url}>{article.url}</a>
                  </li>
                );
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
