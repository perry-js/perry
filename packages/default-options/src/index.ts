import {Options as PerryOptions} from "@perry/perry-interfaces"

const defaultOptions: PerryOptions = {
  log: false,
  warn: true,
  error: true,
  clicks: false,
  cookies: false,
  localStorage: false,
  sessionStorage: false,
  clearOnReload: false,
  ignoreScriptErrors: false,
  plugins: []
};

export default defaultOptions
