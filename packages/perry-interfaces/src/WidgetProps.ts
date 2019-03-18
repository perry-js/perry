import WidgetStatus from "./WidgetStatus";
import PerryReportInfo from "./PerryReportInfo";

export default interface WidgetProps {
  status?: WidgetStatus;
  onSubmit?: (info: PerryReportInfo) => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
};
