import { h } from "preact";
import habitat from "preact-habitat";
import Widget from "../../components/Widget";
import WidgetProps from "@/interfaces/WidgetProps";

const renderWidget = (props: WidgetProps) => {
  const Wrapper = () => (
    <Widget
      onStartRecording={props.onStartRecording}
      onSubmit={props.onSubmit}
    />
  );

  const { render } = habitat(Wrapper);

  render({
    selector: 'body',
    clean: false,
  });
};

export default renderWidget;
