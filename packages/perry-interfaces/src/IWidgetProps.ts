import WidgetStatus from "./enums/WidgetStatus";
import IPerryReport from "./IPerryReport";
import IPerryReportInfo from "./IPerryReportInfo";

export default interface IWidgetProps {
  status?: WidgetStatus;
  onSubmit?: (info: IPerryReportInfo) => Promise<IPerryReport>;
  onStartRecording?: () => Promise<void>;
  onStopRecording?: () => Promise<void>;
}