/* eslint-env node, jest */

import { h } from "preact"
import { render } from "preact-render-to-string"

import Widget from "./"

describe("Widget Snapshot", () => {
  it("should render with content", () => {
    const tree = render(<Widget onSubmit={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
