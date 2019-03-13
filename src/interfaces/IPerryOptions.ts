import IPerryReport from "@/interfaces/IPerryReport";
import IPerryReportInfo from "@/interfaces/IPerryReportInfo";

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