import PerryReport from "@/interfaces/PerryReport";
import PerryReportInfo from "@/interfaces/PerryReportInfo";
import WidgetStatus from "@/interfaces/WidgetStatus";

export default interface IWidgetProps {
  status?: WidgetStatus;
  onSubmit?: (info: PerryReportInfo) => Promise<PerryReport>;
  onStartRecording?: () => Promise<void>;
  onStopRecording?: () => Promise<void>;
}
