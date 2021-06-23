import IPerryReport from './IPerryReport';

export type PerryPlugin = (reportInfo: IPerryReport) => void;

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
