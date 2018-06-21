import PerryReport from '../../interfaces/PerryReport';
import PerryStoreEvent from '../../interfaces/PerryStoreEvent';

const getItemFor = (method: string) =>
  JSON.parse(localStorage.getItem(getKeyFor(method)));

const getKeyFor = (method: string) => `perry::${method}::history`;

const orArray = (expression: any) => expression || [];

export default function aggregateReport(): PerryReport {
  const result: PerryReport = {
    logs: getItemFor("console.log"),
    warns: getItemFor("console.warn"),
    errors: [
      ...orArray(getItemFor("console.error")),
      ...orArray(getItemFor("window.onerror")),
    ],
    cookies: document.cookie,
    clicks: getItemFor("document.onclick")
  };

  return result;
}