import React from "react";

const WordCounts = ({ articleContent }: { articleContent: string }) => {
  const words = articleContent.split(" ");

  return <div className="px-4">words: {words.length}</div>;
};

export default WordCounts;
