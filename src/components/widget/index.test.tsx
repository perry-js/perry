/* eslint-env node, jest */

import { h } from "preact";
import { render } from "preact-render-to-string";

import HelloWorld from "./";

describe("HelloWorld Snapshot", () => {
  it("should render header with content", () => {
    const tree = render(<HelloWorld />);
    expect(tree).toMatchSnapshot();
  });
});
