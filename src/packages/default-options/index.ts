import PerryOptions from "../../interfaces/PerryOptions"

const defaultOptions: PerryOptions = {
  credentials: {
    /** empty credentials */
  },
  log: false,
  warn: true,
  error: true,
  cookies: false,
  localStorage: false,
  sessionStorage: false,
  clicks: false,
  clearOnReload: false,
  ignoreScriptErrors: false
}

export default defaultOptions
