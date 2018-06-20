/* eslint-env node, jest */

import { h } from "preact"
import { render } from "preact-render-to-string"
import { WidgetState } from "@/components/Widget"

import defaultOptions from "../../packages/default-options"

import Widget from "./"

describe("Widget Snapshot", () => {
  it("should render with content", () => {
    const tree = render(<Widget {...defaultOptions} />)
    expect(tree).toMatchSnapshot()
  })
})
