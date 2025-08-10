import React from "react";
import ForceGraph from "./ForceGraph";
import SearchBar from "./SearchBar";
import AuthorProfile from "./AuthorProfile";

interface MainProps {
  articles: { url: string; content: string }[]; // Replace 'any' with the actual article type if available
  serverOn: boolean;
}

const Main: React.FC<MainProps> = ({ articles }) => {
  return (
    <>
      <div className="lg:w-1/3  p-4">
        <AuthorProfile />
      </div>
      <div className=" w-full lg:w-2/3 bg-gray-600">
        <div className="space-y-4">
          {/* Flex container for SearchBar and Articles button */}
          <div className="p-6 rounded-xl shadow-lg flex flex-col lg:flex-row lg:justify-between">
            {/* SearchBar on the left */}
            <div className="flex-1">
              <SearchBar articles={articles} />
            </div>

            {/* Articles Button on the right */}
            <a
              href="/articles"
              className="text-2xl font-bold text-gray-900 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-lg shadow mt-4 lg:mt-0"
            >
              Articles
            </a>
          </div>

          {/* ForceGraph Component */}
          <div className="p-4 rounded-lg shadow-md">
            <ForceGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
