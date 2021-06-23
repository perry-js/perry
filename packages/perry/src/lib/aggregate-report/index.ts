import {
  IPerryReport,
  IPerryReportInfo,
} from '@perry/perry-interfaces';

const getItemFor = (method: string) =>
  JSON.parse(localStorage.getItem(getKeyFor(method)));

const getKeyFor = (method: string) => `perry::${method}::history`;

const orArray = <T>(expression: T) => expression || [];

const aggregateReport = (
  reportInfo: IPerryReportInfo
): IPerryReport => ({
  clicks: orArray(getItemFor('document.onclick')),
  cookies: document.cookie,
  description: reportInfo.description,
  errors: [
    ...orArray(getItemFor('console.error')),
    ...orArray(getItemFor('window.onerror')),
  ],
  logs: orArray(getItemFor('console.log')),
  notify: orArray(getItemFor('perry.notify')),
  recorder: [
    ...orArray(getItemFor('perryscreenrecorder.onrecord')),
    ...orArray(getItemFor('perryscreenrecorder.onerror')),
    ...orArray(getItemFor('perryscreenrecorder.onfinish')),
  ],
  screenshotUrl: reportInfo.screenshotUrl,
  title: reportInfo.title,
  warns: orArray(getItemFor('console.warn')),
});

export default aggregateReport;
