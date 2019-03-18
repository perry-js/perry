import { h } from "preact";
import habitat from "preact-habitat";
import { Widget } from "@perry/perry-components";
import { WidgetProps } from "@perry/perry-interfaces";

const renderWidget = (props: WidgetProps) =>
  habitat(() => <Widget {...props} />).render({
    selector: 'body',
    clean: false,
  });

export default renderWidget;
