import Widget from "@/components/Widget";
import WidgetProps from "@/interfaces/WidgetProps";
import { h, render } from "preact";

const renderWidget = (props: WidgetProps) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(<Widget {...props} />, container);
};

export default renderWidget;
