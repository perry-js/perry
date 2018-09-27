import aggregateReport from './';
import PerryReportInfo from './../../interfaces/PerryReportInfo';

const reportInfo : PerryReportInfo = {
  title: 'Testing',
  description: 'Testing this aggregateReport',
  screenshotUrl: 'http://urlscreenshot.com',
};

const expectReport = {
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

describe('Aggregate report', () => {
  test('Testing aggregate report function', () => {
    expect(aggregateReport(reportInfo)).toEqual(expectReport);
  });
});