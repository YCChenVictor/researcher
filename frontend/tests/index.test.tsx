import "@testing-library/jest-dom";

describe("index.tsx", () => {
  it("should render the App component", () => {
    document.body.innerHTML = '<div id="root"></div>';
    require("../src/index.tsx");
    const rootElement = document.getElementById("root");
    expect(rootElement).toBeInTheDocument();
  });
});
