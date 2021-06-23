import {
  IPerryReport,
  IPerryReportInfo,
} from '@perry/perry-interfaces';
import aggregateReport from '.';

const reportInfo: IPerryReportInfo = {
  description: 'Testing this aggregateReport',
  screenshotUrl: 'http://urlscreenshot.com',
  title: 'Testing',
};

const expectedReport: IPerryReport = {
  clicks: [],
  cookies: document.cookie,
  description: reportInfo.description,
  errors: [],
  logs: [],
  notify: [],
  recorder: [],
  screenshotUrl: reportInfo.screenshotUrl,
  title: reportInfo.title,
  warns: [],
};

describe('aggregateReport', () => {
  it('should return an empty report by default', () => {
    expect(aggregateReport(reportInfo)).toEqual(expectedReport);
  });
});
