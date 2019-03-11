import { h, render } from "preact";
import Widget from "@/components/Widget";
import WidgetProps from "@/interfaces/WidgetProps";

const renderWidget = (props: WidgetProps) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(<Widget {...props} />, container);
}

export default renderWidget;
