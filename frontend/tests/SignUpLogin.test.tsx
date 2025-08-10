import * as renderer from "react-test-renderer";
import * as React from "react";
import SignUpLogin from "../src/components/SignUpLogin";

describe("SignUpLogin", () => {
  it("renders SignUpLogin component without crashing", () => {
    const component = renderer.create(<SignUpLogin />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
