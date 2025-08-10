import * as renderer from "react-test-renderer";
import * as React from "react";
import NodeGraph from "../src/components/NodeGraph";

describe("App", () => {
  it("renders NodeGraph", () => {
    const component = renderer.create(
      <NodeGraph category="software" showDrawAgain={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
