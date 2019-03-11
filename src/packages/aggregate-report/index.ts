import PerryReport from '@/interfaces/PerryReport';
import PerryReportInfo from '@/interfaces/PerryReportInfo';

const getItemFor = (method: string) =>
  JSON.parse(localStorage.getItem(getKeyFor(method)));

const getKeyFor = (method: string) => `perry::${method}::history`;

const orArray = (expression: any) => expression || [];

const aggregateReport =  (reportInfo: PerryReportInfo): PerryReport => ({
  cookies: document.cookie,
  title: reportInfo.title,
  description: reportInfo.description,
  screenshotUrl: reportInfo.screenshotUrl,
  logs: orArray(getItemFor("console.log")),
  warns: orArray(getItemFor("console.warn")),
  clicks: orArray(getItemFor("document.onclick")),
  notify: orArray(getItemFor("perry.notify")),
  errors: [
    ...orArray(getItemFor("console.error")),
    ...orArray(getItemFor("window.onerror"))
  ],
  recorder: [
    ...orArray(getItemFor("perryscreenrecorder.onrecord")),
    ...orArray(getItemFor("perryscreenrecorder.onerror")),
    ...orArray(getItemFor("perryscreenrecorder.onfinish")),
  ]
});

export default aggregateReport