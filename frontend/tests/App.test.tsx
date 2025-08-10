import * as renderer from "react-test-renderer";
import * as React from "react";
import App from "../src/App";

describe("App", () => {
  it("renders App component without crashing", () => {
    const component = renderer.create(React.createElement(App));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
