import WidgetStatus from "../../interfaces/WidgetStatus";

const labels = {
  [WidgetStatus.IDLE]: "Start recording",
  [WidgetStatus.RECORDING]: "Recording...",
  [WidgetStatus.STOPPED]: "Submit",
};

const getLabelForState = (state: WidgetStatus) => labels[state];

export default getLabelForState;