import Widget from "@/components/Widget";
import IWidgetProps from "@/interfaces/IWidgetProps";
import { h, render } from "preact";

const renderWidget = (props: IWidgetProps) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(<Widget {...props} />, container);
};

export default renderWidget;
