import ElementData from "@/interfaces/PerryElementData"
import PerryStoreEvent from "@/interfaces/PerryStoreEvent"
import PerryReportInfo from "@/interfaces/PerryReportInfo";

export default interface PerryReport extends PerryReportInfo {
  cookies: string;
  logs: Array<PerryStoreEvent>;
  warns: Array<PerryStoreEvent>;
  errors: Array<PerryStoreEvent>;
  clicks: Array<PerryStoreEvent>;
  notify: Array<PerryStoreEvent>;
  recorder: Array<PerryStoreEvent>;
}