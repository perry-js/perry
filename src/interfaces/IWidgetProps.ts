import WidgetStatus from "@/enums/WidgetStatus";
import IPerryReport from "@/interfaces/IPerryReport";
import IPerryReportInfo from "@/interfaces/IPerryReportInfo";

export default interface IWidgetProps {
  status?: WidgetStatus;
  onSubmit?: (info: IPerryReportInfo) => Promise<IPerryReport>;
  onStartRecording?: () => Promise<void>;
  onStopRecording?: () => Promise<void>;
}
