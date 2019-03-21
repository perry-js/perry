import IPerryStoreEvent from "./IPerryStoreEvent";

export default interface IPerryReport {
  title?: string;
  description?: string;
  screenshotUrl?: string;
  cookies: string;
  logs: ReadonlyArray<IPerryStoreEvent>;
  warns: ReadonlyArray<IPerryStoreEvent>;
  errors: ReadonlyArray<IPerryStoreEvent>;
  clicks: ReadonlyArray<IPerryStoreEvent>;
  notify: ReadonlyArray<IPerryStoreEvent>;
  recorder: ReadonlyArray<IPerryStoreEvent>;
}
