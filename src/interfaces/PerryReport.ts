import PerryStoreEvent from "@/interfaces/PerryStoreEvent";

export default interface IPerryReport {
  title?: string;
  description?: string;
  screenshotUrl?: string;
  cookies: string;
  logs: ReadonlyArray<PerryStoreEvent>;
  warns: ReadonlyArray<PerryStoreEvent>;
  errors: ReadonlyArray<PerryStoreEvent>;
  clicks: ReadonlyArray<PerryStoreEvent>;
  notify: ReadonlyArray<PerryStoreEvent>;
  recorder: ReadonlyArray<PerryStoreEvent>;
}
