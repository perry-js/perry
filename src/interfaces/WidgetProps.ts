import WidgetStatus from "@/interfaces/WidgetStatus";
import PerryReportInfo from "@/interfaces/PerryReportInfo";

export default interface WidgetProps {
  status?: WidgetStatus;
  onSubmit?: (info: PerryReportInfo) => void,
  onStartRecording: () => void
};
