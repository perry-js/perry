import { IPerryOptions } from '@perry/perry-interfaces';

const defaultOptions: IPerryOptions = {
  clearOnReload: false,
  clearOnStart: true,
  clicks: false,
  cookies: false,
  enableScreenRecording: true,
  error: true,
  ignoreScriptErrors: false,
  localStorage: false,
  log: false,
  plugins: [],
  sessionStorage: false,
  warn: true,
};

export default defaultOptions;
