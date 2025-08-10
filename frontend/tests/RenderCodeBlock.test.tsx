import * as renderer from "react-test-renderer";
import * as React from "react";
import RenderCodeBlock from "../src/components/RenderCodeBlock";

describe("App", () => {
  it("renders RenderCodeBlock without crashing", () => {
    const component = renderer.create(<RenderCodeBlock children={""} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
