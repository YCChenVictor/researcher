import * as renderer from "react-test-renderer";
import * as React from "react";
import UserInNav from "../src/components/UserInNav";

describe("UserInNav", () => {
  it("renders UserInNav component without crashing", () => {
    const component = renderer.create(<UserInNav loggedIn={false} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
