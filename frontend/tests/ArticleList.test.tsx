import * as React from "react";
import * as renderer from "react-test-renderer";
import Articles from "../src/components/Articles";

describe("ArticleList", () => {
  it("renders ArticleList component without crashing", () => {
    const articles = [
      { url: "http://example.com/1", content: "Category 1" },
      { url: "http://example.com/2", content: "Category 2" },
    ];

    const component = renderer.create(<Articles articles={articles} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
