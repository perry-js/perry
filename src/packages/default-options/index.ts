import PerryOptions from "~/interfaces/PerryOptions"

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
