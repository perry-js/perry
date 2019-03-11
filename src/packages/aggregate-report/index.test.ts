import PerryReport from '@/interfaces/PerryReport';
import PerryReportInfo from '@/interfaces/PerryReportInfo';
import aggregateReport from './';

const reportInfo : PerryReportInfo = {
  title: 'Testing',
  description: 'Testing this aggregateReport',
  screenshotUrl: 'http://urlscreenshot.com',
};

const expectedReport: PerryReport = {
  "logs": [],
  "warns": [],
  "clicks": [],
  "errors": [],
  "notify": [],
  "recorder": [],
  "cookies": document.cookie,
  "title": reportInfo.title,
  "description": reportInfo.description,
  "screenshotUrl": reportInfo.screenshotUrl,
};

describe('aggregateReport', () => {
  it('should return an object that matches the expected report', () => {
    expect(aggregateReport(reportInfo)).toEqual(expectedReport);
  });
});
