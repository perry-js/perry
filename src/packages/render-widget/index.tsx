import { h } from "preact";
import habitat from "preact-habitat";
import Widget from "@/components/Widget";
import WidgetProps from "@/interfaces/WidgetProps";

const renderWidget = (props: WidgetProps) => {
  const { render } = habitat(() => <Widget {...props} />);

  render({
    selector: 'body',
    clean: false,
  });
};

export default renderWidget;
