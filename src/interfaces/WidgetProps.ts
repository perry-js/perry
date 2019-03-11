import WidgetStatus from "@/interfaces/WidgetStatus";
import PerryReport from "@/interfaces/PerryReport";
import PerryReportInfo from "@/interfaces/PerryReportInfo";

export default interface WidgetProps {
  status?: WidgetStatus;
  onSubmit?: (info: PerryReportInfo) => Promise<PerryReport>;
  onStartRecording?: () => Promise<void>;
  onStopRecording?: () => Promise<void>;
};
