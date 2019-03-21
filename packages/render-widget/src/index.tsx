import { Widget } from "@perry/perry-components";
import { IWidgetProps } from "@perry/perry-interfaces";
import { h, render } from "preact";

const PERRY_WIDGET_CONTAINER_ID = "perry-widget";

const queryWidgetContainer = () =>
  document.getElementById(PERRY_WIDGET_CONTAINER_ID);

const createWidgetContainer = () =>  {
  const container = document.createElement("div");
  container.setAttribute("id", PERRY_WIDGET_CONTAINER_ID);
  document.body.appendChild(container);
  return container;
};

const renderWidget = (props: IWidgetProps) => {
  const shouldRender = queryWidgetContainer() === null;

  if (shouldRender) {
    render(<Widget {...props} />, createWidgetContainer());
  }
};

export default renderWidget;
