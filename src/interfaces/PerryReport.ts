import PerryStoreEvent from "@/interfaces/PerryStoreEvent"

export default interface PerryReport {
  title?: string;
  description?: string;
  screenshotUrl?: string;
  cookies: string;
  logs: Array<PerryStoreEvent>;
  warns: Array<PerryStoreEvent>;
  errors: Array<PerryStoreEvent>;
  clicks: Array<PerryStoreEvent>;
  notify: Array<PerryStoreEvent>;
  recorder: Array<PerryStoreEvent>;
}