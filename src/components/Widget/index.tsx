import { h } from "preact"

export interface WidgetProps {
  color?: string;
};

const Widget = (props: WidgetProps) => (
  <h1 style={{ color: props.color }}>
    Bug Reporter Widget
  </h1>
);

export default Widget;