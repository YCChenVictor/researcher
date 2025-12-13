import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { HashLink } from "react-router-hash-link";

import WordCounts from "./WordCounts";

const SidebarLayout = ({
  isCollapsed,
  articleContent,
  rawTitles,
}: {
  isCollapsed: boolean;
  articleContent: string;
  rawTitles: { content: string; tagName: string }[];
}) => {
  const titles = rawTitles.map(
    (item: { content: string; tagName: string }) => ({
      content: item.content,
      tagName: item.tagName.match(/\d+/)?.[0] ?? "",
      position: rawTitles.indexOf(item),
    }),
  );
  const textColorMapping = {
    "2": "text-zinc-900",
    "3": "text-zinc-800",
    "4": "text-zinc-700",
    "5": "text-zinc-600",
    "6": "text-zinc-500",
  };
  const paddingLeft = {
    "2": "",
    "3": "pl-4",
    "4": "pl-6",
    "5": "pl-8",
    "6": "pl-10",
  };

  const textSizeMapping: Record<string, string> = {
    "2": "text-xl",
    "3": "text-lg",
    "4": "text-base",
    "5": "text-sm",
    "6": "text-xs",
  };

  const menuItemsDesired = titles.map(
    (title: { content: string; tagName: string }, index: number) => {
      return (
        <MenuItem
          key={index}
          component={
            <HashLink
              to={`#${title.content
                .toLowerCase()
                .replace(/[^\w\s]|_/g, "")
                .replace(/\s+/g, "-")}`}
            />
          }
        >
          <p
            className={`${textColorMapping[title.tagName as keyof typeof textColorMapping]} ${paddingLeft[title.tagName as keyof typeof paddingLeft]} ${textSizeMapping[title.tagName]}`}
          >
            {title.content}
          </p>
        </MenuItem>
      );
    },
  );

  return (
    <>
      <Sidebar backgroundColor="rgb(156 163 175)" collapsed={isCollapsed}>
        <Menu>
          <div className="p-4">
            <WordCounts articleContent={articleContent} />
          </div>
          <h3 className="p-4">Titles</h3>
          {menuItemsDesired}
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarLayout;
