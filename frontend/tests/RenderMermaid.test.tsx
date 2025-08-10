import * as renderer from "react-test-renderer";
import * as React from "react";
import RenderMermaid from "../src/components/RenderMermaid";

describe("RenderMermaid", () => {
  it("renders Article component without crashing", () => {
    const component = renderer.create(<RenderMermaid />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
