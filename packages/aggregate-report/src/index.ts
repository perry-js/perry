import {
  Report as PerryReport,
  ReportInfo as PerryReportInfo,
} from '@perry/perry-interfaces';

const getItemFor = (method: string) =>
  JSON.parse(localStorage.getItem(getKeyFor(method)));

const getKeyFor = (method: string) => `perry::${method}::history`;

const orArray = (expression: any) => expression || [];

const aggregateReport =  (reportInfo: PerryReportInfo): PerryReport => ({
  title: reportInfo.title,
  description: reportInfo.description,
  screenshotUrl: reportInfo.screenshotUrl,
  logs: getItemFor("console.log"),
  warns: getItemFor("console.warn"),
  errors: [
    ...orArray(getItemFor("console.error")),
    ...orArray(getItemFor("window.onerror"))
  ],
  cookies: document.cookie,
  clicks: getItemFor("document.onclick"),
  notify: getItemFor("perry.notify")
});

export default aggregateReport