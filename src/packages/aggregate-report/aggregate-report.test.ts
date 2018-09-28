import aggregateReport from './';
import PerryReportInfo from '@/interfaces/PerryReportInfo';

const reportInfo : PerryReportInfo = {
  title: 'Testing',
  description: 'Testing this aggregateReport',
  screenshotUrl: 'http://urlscreenshot.com',
};

const expectedReport = {
    "clicks": null,
    "cookies": "",
    "description": "Testing this aggregateReport",
    "errors": [],
    "logs": null,
    "notify": null,
    "screenshotUrl":
    "http://urlscreenshot.com",
    "title": "Testing",
    "warns": null
}

describe('Aggregate Report', () => {
  it('should return an object that matches the expected report', () => {
    expect(aggregateReport(reportInfo)).toEqual(expectedReport);
  });
});
