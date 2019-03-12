import PerryReport from "@/interfaces/IPerryReport";
import PerryReportInfo from "@/interfaces/IPerryReportInfo";
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
  it("should return an empty report by default", () => {
    expect(aggregateReport(reportInfo)).toEqual(expectedReport);
  });
});
