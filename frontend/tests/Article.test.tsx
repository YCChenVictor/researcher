import * as renderer from "react-test-renderer";
import * as React from "react";
import Article from "../src/components/Article";

describe("Article", () => {
  it("renders Article component without crashing", () => {
    const component = renderer.create(
      <Article filePath="test/path" content="Test content" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
