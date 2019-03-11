import IPerryReport from "@/interfaces/PerryReport";
import IPerryReportInfo from "@/interfaces/PerryReportInfo";

export type PerryPlugin = (reportInfo: IPerryReportInfo) => IPerryReport;

export default interface IPerryOptions {
  log: boolean;
  warn: boolean;
  error: boolean;
  clicks: boolean;
  cookies: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  clearOnReload: boolean;
  clearOnStart: boolean;
  ignoreScriptErrors: boolean;
  enableScreenRecording: boolean;
  plugins: ReadonlyArray<PerryPlugin>;
}
