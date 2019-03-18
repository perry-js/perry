import PerryStoreEvent from "./PerryStoreEvent"
import PerryReportInfo from "./PerryReportInfo";

export default interface PerryReport extends PerryReportInfo {
  cookies: string;
  logs: Array<PerryStoreEvent>;
  warns: Array<PerryStoreEvent>;
  errors: Array<PerryStoreEvent>;
  clicks: Array<PerryStoreEvent>;
  notify: Array<PerryStoreEvent>;
}