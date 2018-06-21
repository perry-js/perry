import PerryStoreEvent from './PerryStoreEvent';

export default interface Report {
  logs: Array<PerryStoreEvent>;
  warns: Array<PerryStoreEvent>;
  errors: Array<PerryStoreEvent>;
  clicks: Array<PerryStoreEvent>;
  cookies: string;
};
