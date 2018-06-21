import ElementData from "@/interfaces/PerryElementData"
import PerryStoreEvent from "@/interfaces/PerryStoreEvent"

export default interface PerryReport {
  title: string;
  description: string;
  screenshotUrl: string;
  cookies: string;
  event: PerryStoreEvent;
  logs: Array<PerryStoreEvent>;
  warns: Array<PerryStoreEvent>;
  errors: Array<PerryStoreEvent>;
  clicks: Array<PerryStoreEvent>;
}