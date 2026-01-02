"use client";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import WordCounts from "./WordCounts";

type TitleItem = { content: string; tagName: string };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "-");

export default function SidebarLayout({
  isCollapsed,
  articleContent,
  rawTitles,
}: {
  isCollapsed: boolean;
  articleContent: string;
  rawTitles: TitleItem[];
}) {
  const titles = rawTitles.map((item, idx) => ({
    content: item.content,
    level: item.tagName.match(/\d+/)?.[0] ?? "2",
    position: idx,
  }));

  const textColorMapping: Record<string, string> = {
    "2": "text-slate-100",
    "3": "text-slate-200",
    "4": "text-slate-300",
    "5": "text-slate-400",
    "6": "text-slate-400",
  };

  const paddingLeft: Record<string, string> = {
    "2": "",
    "3": "pl-3",
    "4": "pl-5",
    "5": "pl-7",
    "6": "pl-9",
  };

  const textSizeMapping: Record<string, string> = {
    "2": "text-sm",
    "3": "text-sm",
    "4": "text-xs",
    "5": "text-xs",
    "6": "text-xs",
  };

  return (
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor="transparent"
      rootStyles={{
        border: "none",
      }}
    >
      <Menu>
        <div className="p-4">
          <WordCounts articleContent={articleContent} />
        </div>

        <div className="px-4 pb-2 text-xs font-semibold tracking-wide text-slate-400">
          TITLES
        </div>

        {titles.map((t, index) => {
          const href = `#${slugify(t.content)}`;
          return (
            <MenuItem
              key={`${t.position}-${index}`}
              component={<a href={href} />}
              rootStyles={{
                padding: 0,
              }}
            >
              <div
                className={[
                  "px-4 py-1.5 rounded-md hover:bg-slate-800/60 transition-colors",
                  textColorMapping[t.level] ?? "text-slate-200",
                  paddingLeft[t.level] ?? "",
                  textSizeMapping[t.level] ?? "text-sm",
                ].join(" ")}
              >
                <span className="block truncate">{t.content}</span>
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
}
