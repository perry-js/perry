import PerryReport from "@/interfaces/PerryReport";
import PerryReportInfo from "@/interfaces/PerryReportInfo";
import aggregateReport from "./";

const reportInfo: PerryReportInfo = {
  description: "Testing this aggregateReport",
  screenshotUrl: "http://urlscreenshot.com",
  title: "Testing",
};

const expectedReport: PerryReport = {
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

describe("aggregateReport", () => {
  it("should return an object that matches the expected report", () => {
    expect(aggregateReport(reportInfo)).toEqual(expectedReport);
  });
});
