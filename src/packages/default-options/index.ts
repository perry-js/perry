import PerryOptions from "@/interfaces/PerryOptions";

const defaultOptions: PerryOptions = {
  log: false,
  warn: true,
  error: true,
  clicks: false,
  cookies: false,
  localStorage: false,
  sessionStorage: false,
  clearOnReload: false,
  clearOnStart: true,
  ignoreScriptErrors: false,
  enableScreenRecording: true,
  plugins: [],
};

export default defaultOptions;
