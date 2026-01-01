// RenderMermaid.test.tsx
import React from "react";
import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import RenderMermaid from "../../src/components/ArticleComponents/RenderMermaid";

describe("RenderMermaid", () => {
  it("renders", () => {
    render(<RenderMermaid>{"graph TD;A-->B;"}</RenderMermaid>);
  });
});
